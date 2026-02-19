import { Leaf } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 bg-foreground">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Leaf className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-semibold text-background">PlantGuard</span>
          </div>
          <p className="text-sm text-background/50">
            © 2026 PlantGuard. AI-powered plant disease detection.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
