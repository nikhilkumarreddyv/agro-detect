import { useState, useCallback } from "react";
import { Upload, X, Loader2, AlertTriangle, CheckCircle, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: "Low" | "Medium" | "High";
  description: string;
  treatment: string[];
}

const mockResults: DetectionResult[] = [
  {
    disease: "Leaf Blight",
    confidence: 94,
    severity: "High",
    description: "Leaf blight is a common fungal disease that causes browning and wilting of leaves, spreading rapidly in humid conditions.",
    treatment: [
      "Remove and destroy affected leaves immediately",
      "Apply copper-based fungicide every 7-10 days",
      "Improve air circulation around the plant",
      "Avoid overhead watering",
    ],
  },
  {
    disease: "Powdery Mildew",
    confidence: 87,
    severity: "Medium",
    description: "A fungal disease appearing as white powdery spots on leaves and stems, common in warm, dry climates with cool nights.",
    treatment: [
      "Spray neem oil solution weekly",
      "Ensure adequate spacing between plants",
      "Water at the base of plants in the morning",
      "Apply sulfur-based fungicide if severe",
    ],
  },
];

const Detect = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
    setResult(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setResult(mockResults[Math.floor(Math.random() * mockResults.length)]);
      setIsAnalyzing(false);
    }, 2500);
  };

  const clearImage = () => {
    setImage(null);
    setResult(null);
  };

  const severityColor = (s: string) => {
    if (s === "High") return "text-destructive";
    if (s === "Medium") return "text-secondary";
    return "text-primary";
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
              Detect Plant Disease
            </h1>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              Upload a clear photo of the affected plant and our AI will diagnose it.
            </p>
          </div>

          {/* Upload Area */}
          <div className="max-w-2xl mx-auto">
            {!image ? (
              <label
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex flex-col items-center justify-center h-72 rounded-2xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
                  isDragging
                    ? "border-primary bg-accent/50 scale-[1.02]"
                    : "border-border hover:border-primary/50 hover:bg-accent/30"
                }`}
              >
                <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                <p className="text-foreground font-medium mb-1">Drop your image here or click to browse</p>
                <p className="text-sm text-muted-foreground">Supports JPG, PNG, WEBP</p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
              </label>
            ) : (
              <div className="space-y-6">
                <div className="relative rounded-2xl overflow-hidden shadow-card">
                  <img src={image} alt="Uploaded plant" className="w-full max-h-96 object-cover" />
                  <button
                    onClick={clearImage}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-foreground/70 flex items-center justify-center hover:bg-foreground/90 transition-colors"
                  >
                    <X className="w-4 h-4 text-background" />
                  </button>
                </div>

                {!result && (
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    size="lg"
                    className="w-full bg-gradient-hero text-primary-foreground hover:opacity-90 py-6 text-base gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Leaf className="w-5 h-5" />
                        Analyze Plant
                      </>
                    )}
                  </Button>
                )}

                {/* Results */}
                {result && (
                  <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-card animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <AlertTriangle className={`w-5 h-5 ${severityColor(result.severity)}`} />
                          <span className={`text-sm font-semibold ${severityColor(result.severity)}`}>
                            {result.severity} Severity
                          </span>
                        </div>
                        <h2 className="text-2xl font-display font-bold text-foreground">{result.disease}</h2>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold text-primary">{result.confidence}%</div>
                        <div className="text-xs text-muted-foreground">Confidence</div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">{result.description}</p>

                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-3">Recommended Treatment</h3>
                      <ul className="space-y-2">
                        {result.treatment.map((t, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm">
                            <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                            <span className="text-muted-foreground">{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button
                      onClick={clearImage}
                      variant="outline"
                      className="mt-6 w-full"
                    >
                      Analyze Another Plant
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Detect;
