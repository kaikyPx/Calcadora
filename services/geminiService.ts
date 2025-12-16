import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize only if key exists to avoid immediate crash, but handle in call
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({ apiKey });
}

export const solveMathProblem = async (problem: string): Promise<string> => {
  if (!ai) {
    throw new Error("API Key não configurada. Por favor, configure a chave da API.");
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Você é um assistente matemático avançado. Resolva o seguinte problema matemático ou pergunta relacionada a cálculos.
      
      Problema: "${problem}"

      Instruções:
      1. Forneça a resposta final de forma clara.
      2. Se for um cálculo passo a passo, mostre os passos brevemente.
      3. Use formatação Markdown simples para matemática se necessário (ex: x^2).
      4. Mantenha a resposta concisa.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text || "Não foi possível gerar uma resposta.";
  } catch (error: any) {
    console.error("Erro ao chamar Gemini:", error);
    return `Erro: ${error.message || "Falha na comunicação com a IA."}`;
  }
};
