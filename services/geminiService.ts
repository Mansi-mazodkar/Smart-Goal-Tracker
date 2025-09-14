
import { GoogleGenAI, Type } from "@google/genai";
import { AIReflection, Goal } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getAIReflection = async (incompleteGoals: Goal[]): Promise<AIReflection> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const prompt = `
    You are a motivational and helpful AI assistant for a student using a goal-tracking app.
    The student had a few incomplete goals today. Based on the goals and their reasons for not completing them, provide:
    1. A single, concise, and uplifting motivational tip (2-3 sentences).
    2. A list of 2 relevant YouTube video links to help with the topics.
    3. A list of 2 relevant article or blog post links to help with the topics.

    Here are the incomplete goals:
    ${incompleteGoals.map(g => `- Goal: "${g.title}", Category: ${g.category}, Reason: ${g.reason || 'Not specified'}`).join('\n')}

    Please provide a response in the specified JSON format. Ensure the links are real and relevant.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            motivationalTip: {
              type: Type.STRING,
              description: "An uplifting motivational tip for the student.",
            },
            youtubeLinks: {
              type: Type.ARRAY,
              description: "A list of relevant YouTube video resources.",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  url: { type: Type.STRING },
                },
              },
            },
            articleLinks: {
              type: Type.ARRAY,
              description: "A list of relevant article or blog post resources.",
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  url: { type: Type.STRING },
                },
              },
            },
          },
        },
      },
    });

    const jsonString = response.text;
    return JSON.parse(jsonString) as AIReflection;

  } catch (error) {
    console.error("Error fetching AI reflection:", error);
    throw new Error("Failed to get a reflection from the AI. Please try again.");
  }
};

export const getAIChatResponse = async (query: string, history: { role: string, parts: { text: string }[] }[]): Promise<string> => {
   if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: history
  });

  try {
    const response = await chat.sendMessage({ message: query });
    return response.text;
  } catch (error) {
    console.error("Error fetching AI chat response:", error);
    throw new Error("The AI assistant is currently unavailable.");
  }
};
