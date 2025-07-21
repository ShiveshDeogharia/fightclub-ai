// server/coachService.js
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateCoachAdvice(userName, opponent, coach) {
  try {
    const prompt = `You are ${coach}, coaching ${userName} on how to defeat ${opponent} in a fantasy boxing or MMA match.
Speak directly to ${userName} with intensity and passion. Give your best strategic advice, mental preparation, and motivational hype. Stay in character.`

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: { temperature: 0.85 }
    });

    const text = response.text;
    if (!text) throw new Error("No content from Gemini");

    return text;
  } catch (err) {
    console.error("Gemini API error (Coach):", err);
    throw new Error("Coach advice generation failed");
  }
}
