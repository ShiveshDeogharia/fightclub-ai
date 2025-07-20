import Matchup from '../models/Matchup.js';

export const createMatchup = async (req, res) => {
  try {
    const { fighterA, fighterB, result } = req.body;

    const newMatchup = new Matchup({ fighterA, fighterB, result });
    const saved = await newMatchup.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllMatchups = async (req, res) => {
  try {
    const matchups = await Matchup.find()
      .populate('fighterA')
      .populate('fighterB');
    res.status(200).json(matchups);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
