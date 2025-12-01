const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },

  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // The age/gender brackets defined by the director at creation
  ageBrackets: [
    {
      ageGroup: { type: String, required: true }, // 11U, 12U, etc.
      gender: { type: String, required: true }, // Boys, Girls, Coed
    },
  ],

  // List of bracket documents created automatically when tournament is created
  brackets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bracket",
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Tournament", tournamentSchema);

