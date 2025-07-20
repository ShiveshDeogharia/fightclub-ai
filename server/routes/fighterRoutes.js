import express from 'express';
import { createFighter, getAllFighters } from '../controllers/fighterController.js';
import Fighter from '../models/Fighter.js';

const router = express.Router();

router.post('/', createFighter);
router.get('/', getAllFighters);

// Danger zone: clear all fighters
router.delete('/clear', async (req, res) => {
  try {
    await Fighter.deleteMany({});
    res.status(200).json({ message: 'All fighters deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
