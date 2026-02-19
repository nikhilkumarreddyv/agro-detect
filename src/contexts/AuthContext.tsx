import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("agro_user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {}
    }
    setIsLoading(false);
  }, []);

  const getUsers = (): Record<string, { name: string; passwordHash: string }> => {
    const stored = localStorage.getItem("agro_users");
    return stored ? JSON.parse(stored) : {};
  };

  const saveUsers = (users: Record<string, { name: string; passwordHash: string }>) => {
    localStorage.setItem("agro_users", JSON.stringify(users));
  };

  // Simple hash (not secure, but fine for a demo without a backend)
  const simpleHash = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return hash.toString(36);
  };

  const login = async (email: string, password: string) => {
    const users = getUsers();
    const userData = users[email.toLowerCase()];
    if (!userData) {
      return { success: false, error: "No account found with this email." };
    }
    if (userData.passwordHash !== simpleHash(password)) {
      return { success: false, error: "Incorrect password." };
    }
    const loggedIn: User = {
      id: simpleHash(email),
      name: userData.name,
      email: email.toLowerCase(),
    };
    setUser(loggedIn);
    localStorage.setItem("agro_user", JSON.stringify(loggedIn));
    return { success: true };
  };

  const register = async (name: string, email: string, password: string) => {
    if (name.trim().length < 2) return { success: false, error: "Name must be at least 2 characters." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { success: false, error: "Invalid email address." };
    if (password.length < 6) return { success: false, error: "Password must be at least 6 characters." };

    const users = getUsers();
    if (users[email.toLowerCase()]) {
      return { success: false, error: "An account with this email already exists." };
    }
    users[email.toLowerCase()] = { name: name.trim(), passwordHash: simpleHash(password) };
    saveUsers(users);

    const newUser: User = {
      id: simpleHash(email),
      name: name.trim(),
      email: email.toLowerCase(),
    };
    setUser(newUser);
    localStorage.setItem("agro_user", JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("agro_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
