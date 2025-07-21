// server/routes/trashTalk.js
import express from "express";
import { generateTrashTalk } from "../trashTalkService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { fighter1, fighter2 } = req.body;
  try {
    const trashTalk = await generateTrashTalk(fighter1, fighter2);
    res.json({ trashTalk });
  } catch (err) {
    res.status(500).json({ error: "Failed to generate trash talk." });
  }
});

export default router;
