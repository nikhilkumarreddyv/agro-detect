import { ArrowRight, ScanSearch } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-plant.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-foreground/30" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 mb-6">
            <ScanSearch className="w-4 h-4 text-leaf" />
            <span className="text-sm font-medium text-leaf-foreground">AI-Powered Plant Diagnostics</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-primary-foreground leading-tight mb-6">
            Detect Plant
            <br />
            <span className="text-leaf">Diseases</span>
            <br />
            Instantly
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-lg mb-8 font-body">
            Upload a photo of your plant and our AI will identify diseases, provide treatment recommendations, and help you keep your garden thriving.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/detect">
              <Button size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity text-base px-8 py-6 gap-2">
                Start Detection
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <a href="#how-it-works">
              <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6">
                Learn More
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
