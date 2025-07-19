import Fighter from '../models/Fighter.js';

export const createFighter = async (req, res) => {
  try {
    const newFighter = new Fighter(req.body);
    const savedFighter = await newFighter.save();
    res.status(201).json(savedFighter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllFighters = async (req, res) => {
  try {
    const fighters = await Fighter.find();
    res.status(200).json(fighters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
