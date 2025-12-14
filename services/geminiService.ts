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
      
      You are the mysterious shopkeeper of "Cloudside Shop" (云边铺子).
      
      **CRITICAL INSTRUCTIONS:**
      1.  **Length**: **STRICTLY around 50 Chinese characters (or less).** Short and punchy.
      2.  **Impact**: The response must be "spine-tingling" (让人头皮发麻). It should be a sudden realization, a philosophical slap, or a poetic truth that cuts through the noise.
      3.  **Tone**: Sharp, profound, slightly detached but deeply observant. Not generic "chicken soup".
      
      **Style Examples (Target Vibe):**
      - "你都在这路遥马急的人间，何必为一张未知的考卷，提前交了白卷。"
      - "半山腰太挤了，你得去山顶看看。"
      - "很多时候，你以为是错过了，其实是躲过了一劫。"
      - "勇敢不是不害怕，而是双腿颤抖，却依然向前走。"
      
      Please answer primarily in Chinese.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 1.0, 
        systemInstruction: "You are a profound, minimal, and sharp observer of life.",
      }
    });

    return response.text || "风把答案吹散了，只剩下云的形状。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "云层太厚，信号迷路了。";
  }
};