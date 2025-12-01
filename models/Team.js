const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: { type: String, required: true },
  clubName: { type: String, required: true },

  ageGroup: { type: String, required: true },
  gender: { type: String, required: true }, // Boys, Girls, Coed

  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Optional: division the coach prefers (Gold, Silver, Bronze)
  requestedTier: { type: String },

  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
  },

  bracket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bracket",
  },

  pool: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pool",
  },

  // Player cards assigned by coach (multiple allowed)
  playerCards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PlayerCard",
    }
  ],

}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);

