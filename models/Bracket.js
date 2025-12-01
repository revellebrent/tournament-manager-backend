const mongoose = require("mongoose");

const bracketSchema = new mongoose.Schema({
  ageGroup: { type: String, required: true }, // 11U, 12U, etc.
  gender: { type: String, required: true }, // Boys, Girls, Coed

  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },

  // Pools manually created by the director: A, B, C...
  pools: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pool",
    },
  ],

}, { timestamps: true });

module.exports = mongoose.model("Bracket", bracketSchema);

