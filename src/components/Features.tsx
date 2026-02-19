import { Zap, Shield, Sprout, Globe } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get disease identification in seconds, not days. Our AI processes images faster than any lab test.",
  },
  {
    icon: Shield,
    title: "High Accuracy",
    description: "Powered by generative AI trained on millions of plant images for reliable, precise diagnostics.",
  },
  {
    icon: Sprout,
    title: "Treatment Plans",
    description: "Receive actionable treatment recommendations tailored to the specific disease and plant species.",
  },
  {
    icon: Globe,
    title: "Wide Coverage",
    description: "Supports detection across hundreds of plant species and thousands of known diseases worldwide.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">Features</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3">
            Why PlantGuard?
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-background border border-border hover:shadow-card hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
