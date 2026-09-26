import { GoogleGenAI } from "@google/genai";

// Crash-proof access to API Key for production environments
const getSafeApiKey = () => {
  try {
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
    if (typeof window !== 'undefined' && (window as any).process?.env?.API_KEY) {
      return (window as any).process.env.API_KEY;
    }
    return '';
  } catch (e) {
    return '';
  }
};

export const generateDesignConcept = async (prompt: string) => {
  const apiKey = getSafeApiKey();
  if (!apiKey) {
    return "API Key not configured. Please contact the administrator.";
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `You are an expert sportswear design consultant for Apex Manufacturing. Based on the user's request: "${prompt}", provide a detailed design specification including recommended fabrics, color hex codes, and style features. Return your answer in a clear, professional tone.`,
    config: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
    }
  });

  return response.text || '';
};

export const generateUniformPreview = async (prompt: string) => {
  const apiKey = getSafeApiKey();
  if (!apiKey) return null;
  
  const ai = new GoogleGenAI({ apiKey });
  
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        { text: `A professional studio product photography of a custom sports uniform. Style: ${prompt}. High quality, 4k, clean background, athletic fit.` }
      ]
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1"
      }
    }
  });

  if (response.candidates?.[0]?.content?.parts) {
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  }
  return null;
};