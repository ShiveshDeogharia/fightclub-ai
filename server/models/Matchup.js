import mongoose from "mongoose";

const matchupSchema = new mongoose.Schema({
  fighterA: {
    type: String,
    required: true,
  },
  fighterB: {
    type: String,
    required: true,
  },
  result: {
    type: String,
    required: true,
  },
});

const Matchup = mongoose.model("Matchup", matchupSchema);
export default Matchup;
