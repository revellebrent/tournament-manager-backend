const mongoose = require("mongoose");

const poolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // "A", "B", "C" etc.
  },

  bracket: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bracket",
    required: true,
  },

  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },

  teams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    }
  ],

}, { timestamps: true });

module.exports = mongoose.model("Pool", poolSchema);


