// server/routes/coach.js
import express from "express";
import { generateCoachAdvice } from "../coachService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { userName, opponent, coach } = req.body;

    if (!userName || !opponent || !coach) {
      return res.status(400).json({ error: "userName, opponent, and coach are required" });
    }

    const advice = await generateCoachAdvice(userName, opponent, coach);
    res.json({ advice });

  } catch (error) {
    console.error("Error generating coach advice:", error);
    res.status(500).json({ error: "Coach advice generation failed" });
  }
});

export default router;
