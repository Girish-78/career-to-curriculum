import { GoogleGenAI, Type } from "@google/genai";
import { InfographicData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateCareerConnections = async (topic: string): Promise<InfographicData> => {
  const modelId = "gemini-2.5-flash"; // Good balance of speed and reasoning for this task

  const prompt = `
    You are an expert Physics Curriculum Consultant. 
    Create an infographic content plan linking the Senior School Physics topic: "${topic}" to real-world careers.
    
    Provide 4 distinct, highly relevant careers that heavily rely on understanding ${topic}.
    For each career, provide:
    1. A short description.
    2. Estimated average annual salary in Indian Rupees (INR) (number only).
    3. Projected 10-year job growth percentage (number only).
    4. Minimum typical degree level (Bachelors, Masters, PhD).
    5. A specific, actionable 1-sentence "Classroom Link" or activity a teacher can do to demonstrate this career connection.
    6. Top 3 key skills required (short strings).
  `;

  const response = await ai.models.generateContent({
    model: modelId,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          topic: { type: Type.STRING },
          summary: { type: Type.STRING, description: "A brief 1-sentence overview of why this physics topic matters to the world." },
          careers: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                salary: { type: Type.NUMBER },
                growth: { type: Type.NUMBER },
                degreeLevel: { type: Type.STRING },
                classroomActivity: { type: Type.STRING },
                skills: { type: Type.ARRAY, items: { type: Type.STRING } },
              },
              required: ["title", "description", "salary", "growth", "degreeLevel", "classroomActivity", "skills"]
            }
          }
        },
        required: ["topic", "summary", "careers"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(text) as InfographicData;
};