import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the elite digital concierge for "Buxiang Business" (不象商务), a localized service app in Yueyang, Hunan.
Your persona is professional, warm, and highly knowledgeable about Hunan culture.
`;

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export const generateContent = async (prompt: string, history: ChatMessage[] = []): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || '抱歉，系统繁忙，请稍后再试。';
  } catch (error) {
    console.error('Gemini API Error:', error);
    return '网络连接失败，请检查网络。';
  }
};

export const generateMenuRecommendation = async (preferences: string): Promise<string> => {
  const prompt = `Guests at the Buxiang Business Clubhouse have the following dietary preferences: "${preferences}". 
  Please generate a 5-course localized Yueyang/Hunan business dinner menu. 
  Include a brief description for each dish explaining its cultural significance. 
  Format as a clean list.`;

  return generateContent(prompt);
};