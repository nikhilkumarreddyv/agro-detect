interface DetectionResult {
  disease: string;
  confidence: number;
  severity: "Low" | "Medium" | "High";
  description: string;
  treatment: string[];
}

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// List of models to try in order of preference
const MODEL_ALTERNATIVES = [
  "gemini-1.5-flash-latest",
  "gemini-1.5-pro-latest", 
  "gemini-pro-vision",
  "gemini-pro",
  "gemini-1.5-flash",
  "gemini-1.5-pro",
];

let cachedAvailableModel: string | null = null;

/**
 * Fetch available models and find one that supports vision
 */
async function getAvailableVisionModel(): Promise<string> {
  if (cachedAvailableModel) {
    return cachedAvailableModel;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`
    );
    
    if (response.ok) {
      const data = await response.json();
      const models = data.models || [];
      
      // Find a model that supports generateContent and has vision capabilities
      for (const modelName of MODEL_ALTERNATIVES) {
        const found = models.find((m: any) => {
          const name = m.name.replace('models/', '');
          return name === modelName && 
                 m.supportedGenerationMethods?.includes('generateContent');
        });
        
        if (found) {
          cachedAvailableModel = modelName;
          console.log('Using model:', modelName);
          return modelName;
        }
      }
      
      // If we have models but none match our list, try the first one that supports generateContent
      const fallback = models.find((m: any) => 
        m.supportedGenerationMethods?.includes('generateContent')
      );
      
      if (fallback) {
        const modelName = fallback.name.replace('models/', '');
        cachedAvailableModel = modelName;
        console.log('Using fallback model:', modelName);
        return modelName;
      }
    }
  } catch (error) {
    console.warn('Failed to fetch model list, using default:', error);
  }
  
  // Default fallback
  cachedAvailableModel = 'gemini-pro-vision';
  return cachedAvailableModel;
}

/**
 * Convert base64 image to the format expected by Gemini API
 */
function prepareImageForAPI(base64Image: string): { inlineData: { mimeType: string; data: string } } {
  // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
  const base64Data = base64Image.split(",")[1];
  // Extract mime type
  const mimeType = base64Image.split(";")[0].split(":")[1];
  
  return {
    inlineData: {
      mimeType,
      data: base64Data,
    },
  };
}

/**
 * Parse AI response into structured DetectionResult
 */
function parseAIResponse(responseText: string): DetectionResult {
  try {
    // Try to extract JSON if the response contains it
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        disease: parsed.disease || "Unknown Disease",
        confidence: parsed.confidence || 85,
        severity: parsed.severity || "Medium",
        description: parsed.description || "Unable to determine disease details.",
        treatment: parsed.treatment || ["Consult a plant disease specialist"],
      };
    }

    // Fallback: parse unstructured response
    const lines = responseText.split("\n").filter((line) => line.trim());
    
    let disease = "Unknown Disease";
    let description = "";
    let treatment: string[] = [];
    let confidence = 85;
    let severity: "Low" | "Medium" | "High" = "Medium";

    // Look for disease name
    const diseaseMatch = responseText.match(/(?:disease|condition|problem)[:\s]+([^\n.]+)/i);
    if (diseaseMatch) disease = diseaseMatch[1].trim();

    // Look for severity
    if (/\b(severe|high|critical)\b/i.test(responseText)) severity = "High";
    else if (/\b(mild|low|minor)\b/i.test(responseText)) severity = "Low";

    // Extract description (first substantial paragraph)
    const descMatch = responseText.match(/(?:description|about|appears)[:\s]+([^\n]+(?:\n[^\n]+)*?)(?:\n\n|treatment|recommendation)/i);
    if (descMatch) {
      description = descMatch[1].trim();
    } else {
      description = lines.slice(0, 2).join(" ");
    }

    // Extract treatment steps
    const treatmentMatch = responseText.match(/(?:treatment|recommendation|solution|steps)[:\s]+([\s\S]+)/i);
    if (treatmentMatch) {
      const treatmentText = treatmentMatch[1];
      treatment = treatmentText
        .split(/\n|(?:\d+\.)|(?:-\s)/)
        .filter((step) => step.trim().length > 10)
        .map((step) => step.trim())
        .slice(0, 5);
    }

    if (treatment.length === 0) {
      treatment = ["Ensure proper watering and drainage", "Monitor plant health regularly", "Consult a local plant specialist"];
    }

    return { disease, confidence, severity, description, treatment };
  } catch (error) {
    console.error("Error parsing AI response:", error);
    return {
      disease: "Analysis Completed",
      confidence: 80,
      severity: "Medium",
      description: responseText.slice(0, 200),
      treatment: ["Review the full analysis", "Consult with a plant expert if symptoms persist"],
    };
  }
}

/**
 * Analyze plant image using Google Gemini Vision API
 */
export async function analyzePlantDisease(base64Image: string): Promise<DetectionResult> {
  if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_api_key_here") {
    throw new Error(
      "API key not configured. Please add your VITE_GEMINI_API_KEY to the .env file. Get your key from https://makersuite.google.com/app/apikey"
    );
  }

  try {
    // Get an available model that supports vision
    const modelName = await getAvailableVisionModel();
    const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
    
    const imageData = prepareImageForAPI(base64Image);

    const prompt = `You are an expert plant pathologist. Analyze this plant image and provide a detailed diagnosis.

Please provide your response in the following JSON format:
{
  "disease": "Name of the disease or 'Healthy' if no disease detected",
  "confidence": number between 0-100,
  "severity": "Low" or "Medium" or "High",
  "description": "Detailed description of the condition, symptoms, and causes",
  "treatment": ["Step 1", "Step 2", "Step 3", "Step 4"]
}

Focus on:
1. Identifying any visible diseases, pests, or nutritional deficiencies
2. Assessing the severity level
3. Providing actionable treatment recommendations
4. Being specific about the condition

If the plant appears healthy, indicate that in the diagnosis.`;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              imageData,
            ],
          },
        ],
        generationConfig: {
          temperature: 0.4,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE",
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || `API request failed with status ${response.status}`
      );
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0]?.content?.parts?.[0]?.text) {
      throw new Error("Invalid response format from API");
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    return parseAIResponse(aiResponse);
  } catch (error) {
    console.error("Error analyzing plant disease:", error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error("Failed to analyze plant image. Please try again.");
  }
}
