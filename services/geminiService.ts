import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key not found");
  }
  return new GoogleGenAI({ apiKey });
};

export const generateWisdom = async (question: string): Promise<string> => {
  try {
    const ai = getClient();
    const prompt = `
      User input: "${question}"
      
      You are the shopkeeper of "Cloudside Shop" (云边铺子), a cozy, magical little store sitting on the edge of a cloud.
      Users come here to drop off a "diary entry" (their question or thought) for the day.
      
      Your role is to reply like a warm, gentle, and empathetic friend who listens carefully.
      - Treat their input as a diary entry or a letter.
      - Provide a "receipt" in the form of comforting advice, a fresh perspective, or a warm observation.
      - The tone should be relaxed (轻松), healing (治愈), and slightly literary but easy to read.
      - Avoid being too preachy or solemn. Be like a soft breeze or a warm cup of tea.
      
      Please answer primarily in Chinese.
      Keep the length moderate.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 1, // Higher creativity for the "shopkeeper" persona
        systemInstruction: "You are the gentle owner of the Cloudside Shop.",
      }
    });

    return response.text || "云端的信号被风吹散了，请稍后再试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "今天的云层有点厚，店主暂时看不清远方。";
  }
};