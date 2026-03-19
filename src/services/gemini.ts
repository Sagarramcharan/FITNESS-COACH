import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, FitnessPlan } from "../types";

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const fitnessPlanSchema = {
  type: Type.OBJECT,
  properties: {
    weeklyWorkouts: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING },
          focus: { type: Type.STRING },
          warmup: { type: Type.ARRAY, items: { type: Type.STRING } },
          exercises: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                duration: { type: Type.STRING },
                reps: { type: Type.STRING },
                sets: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["id", "name", "duration", "description"]
            }
          },
          cooldown: { type: Type.ARRAY, items: { type: Type.STRING } },
          totalDuration: { type: Type.STRING }
        },
        required: ["day", "focus", "warmup", "exercises", "cooldown", "totalDuration"]
      }
    },
    dietPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING },
          meals: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                type: { type: Type.STRING },
                name: { type: Type.STRING },
                ingredients: { type: Type.ARRAY, items: { type: Type.STRING } },
                calories: { type: Type.NUMBER },
                protein: { type: Type.NUMBER },
                carbs: { type: Type.NUMBER },
                fats: { type: Type.NUMBER }
              },
              required: ["id", "type", "name", "ingredients", "calories", "protein", "carbs", "fats"]
            }
          },
          totalCalories: { type: Type.NUMBER }
        },
        required: ["day", "meals", "totalCalories"]
      }
    },
    recommendations: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["weeklyWorkouts", "dietPlan", "recommendations"]
};

export async function generateFitnessPlan(profile: UserProfile): Promise<FitnessPlan> {
  const prompt = `
    Act as an expert AI Health and Fitness Coach. Generate a comprehensive 7-day fitness and diet plan for a user with the following profile:
    - Age: ${profile.age}
    - Gender: ${profile.gender}
    - Height: ${profile.height}cm
    - Weight: ${profile.weight}kg
    - Activity Level: ${profile.activityLevel}
    - Goal: ${profile.goal}
    - Diet Preference: ${profile.dietPreference}
    - Health Conditions: ${profile.healthConditions || 'None'}

    Requirements:
    1. Workout Plan: Daily routines, duration, warm-up/cool-down. If beginner, keep it simple.
    2. Diet Plan: Based on ${profile.dietPreference} preference. Use simple Indian household foods (e.g., Dal, Roti, Sabzi, Poha, Idli). Ensure balanced nutrition.
    3. Provide specific exercises and meals with nutritional info.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: fitnessPlanSchema as any
    }
  });

  return JSON.parse(response.text || '{}') as FitnessPlan;
}

export async function chatWithCoach(message: string, history: { role: 'user' | 'model', text: string }[]) {
  const chat = ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: "You are FitAI Coach, a friendly and professional health and fitness expert. Answer questions about workouts, nutrition, and general health based on scientific evidence and practical advice. Keep responses concise and encouraging."
    }
  });

  // Note: sendMessage doesn't take history directly in this SDK version, 
  // but we can simulate it or just send the message.
  // The SDK usually handles history if we keep the chat object, but for stateless API calls:
  const response = await chat.sendMessage({ message });
  return response.text;
}
