import { Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-hero flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-semibold text-foreground">PlantGuard</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            How it Works
          </a>
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <Link to="/detect">
            <Button className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity">
              Detect Disease
            </Button>
          </Link>
        </div>
        <Link to="/detect" className="md:hidden">
          <Button size="sm" className="bg-gradient-hero text-primary-foreground hover:opacity-90">
            Detect
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
