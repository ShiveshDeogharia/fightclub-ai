// server/geminiService.js
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateFightResult(fighter1, fighter2) {
  try {
    const prompt = `Simulate a fantasy boxing or MMA match between ${fighter1} and ${fighter2}. Short, exciting commentary. Bold the winner’s name.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash", // supported flash model
      contents: prompt,
      config: { temperature: 0.7 } // optional tuning
    });

    const text = response.text; 

    if (!text) {
      throw new Error("No content from Gemini");
    }

    return text;
  } catch (err) {
    console.error("Gemini API error:", err);
    throw new Error("Simulation failed");
  }
}
