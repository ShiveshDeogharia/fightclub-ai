import mongoose from 'mongoose';

const FighterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sport: {
    type: String,
    enum: ['Boxing', 'MMA'],
    required: true,
  },
  record: {
    wins: Number,
    losses: Number,
    draws: Number,
    kos: Number,
  },
  stats: {
    height: String,   // e.g., "6'2\""
    weight: String,   // e.g., "205 lbs"
    reach: String,    // e.g., "76 in"
    stance: String,   // e.g., "Orthodox"
    style: String,    // e.g., "Striker"
  },
  bio: String,
  imageUrl: String,           // optional fighter photo
  personalityPrompt: String,  // used for AI fighter chat
}, { timestamps: true });

export default mongoose.model('Fighter', FighterSchema);
