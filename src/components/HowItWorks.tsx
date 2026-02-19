import { Upload, Cpu, FileText } from "lucide-react";

const steps = [
  {
    icon: Upload,
    title: "Upload Photo",
    description: "Take a clear photo of the affected plant leaf or stem and upload it to our platform.",
  },
  {
    icon: Cpu,
    title: "AI Analysis",
    description: "Our generative AI model analyzes the image, identifying patterns and symptoms of diseases.",
  },
  {
    icon: FileText,
    title: "Get Results",
    description: "Receive a detailed diagnosis with disease name, severity, and recommended treatments.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-secondary uppercase tracking-wider">How it Works</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mt-3">
            Three Simple Steps
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Identify plant diseases in seconds with our AI-powered detection system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="relative text-center group">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px border-t-2 border-dashed border-border" />
              )}
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-accent flex items-center justify-center shadow-soft group-hover:bg-primary group-hover:shadow-lg transition-all duration-300">
                <step.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">Step {i + 1}</span>
              <h3 className="text-xl font-display font-semibold text-foreground mt-2 mb-3">{step.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
