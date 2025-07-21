import express from "express";
import { generateFightResult } from "../geminiService.js";
import Matchup from "../models/Matchup.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { fighter1, fighter2 } = req.body;

    if (!fighter1 || !fighter2) {
      return res.status(400).json({ error: "Both fighter names are required" });
    }

    const result = await generateFightResult(fighter1, fighter2);

    const newMatchup = new Matchup({
      fighterA: fighter1,
      fighterB: fighter2,
      result,
    });

    await newMatchup.save();

    res.status(200).json(newMatchup);
  } catch (error) {
    console.error("Error simulating fight:", error);
    res.status(500).json({ error: "Simulation failed." });
  }
});

export default router;
