import mongoose from 'mongoose';

const MatchupSchema = new mongoose.Schema({
  fighterA: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fighter',
    required: true,
  },
  fighterB: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Fighter',
    required: true,
  },
  result: {
    type: String, // AI-generated outcome text
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.model('Matchup', MatchupSchema);
