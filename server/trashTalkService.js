// server/trashTalkService.js
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateTrashTalk(fighter1, fighter2) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Write a funny and bold trash talk between ${fighter1} and ${fighter2}. Keep it entertaining but clean.`,
    });

    const text = response.text;
    if (!text) throw new Error("No trash talk generated");
    return text;
  } catch (err) {
    console.error("Trash Talk error:", err);
    throw new Error("Trash Talk generation failed");
  }
}
