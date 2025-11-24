import { GoogleGenAI, Chat } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are the elite digital concierge for "Buxiang Business" (不象商务), a localized service app in Yueyang, Hunan.
Your persona is professional, warm, and highly knowledgeable about Hunan culture, local business etiquette, and local delicacies (cured meat, spicy food).

Your capabilities:
1. Recommend local "Selected Specialties" (特产甄选) such as Preserved pork, Junshan Yinzhen tea, Spicy fish, and Changle Sweet Wine.
2. Assist with Business Clubhouse bookings (Meeting rooms, Salons).
3. Generate custom banquet menus based on guest preferences using local ingredients.
4. Arrange localized concierge services, specifically:
   - Medical Accompaniment (陪诊): Helping elderly family members with hospital visits.
   - Government Affairs (政务协办): Local business registration or paperwork.
   - Car Rental & Airport Pickup.
   - Running errands.

Tone: Helpful, efficient, slightly formal but welcoming hometown feel.
Language: Chinese (Simplified).
`;

let chatSession: Chat | null = null;

export const getGeminiChat = (): Chat => {
  if (!chatSession) {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }
  return chatSession;
};

export const generateMenuRecommendation = async (preferences: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Guests at the Buxiang Business Clubhouse have the following dietary preferences/needs: "${preferences}". 
  Please generate a 5-course localized Yueyang/Hunan business dinner menu. 
  Include a brief description for each dish explaining its cultural significance or flavor profile. 
  Format as a clean markdown list.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text || "抱歉，暂时无法生成菜单，请稍后再试。";
  } catch (error) {
    console.error("Menu generation failed", error);
    return "系统繁忙，请直接联系管家进行菜单定制。";
  }
};