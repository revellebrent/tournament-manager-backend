const mongoose = require("mongoose");

const teamApplicationSchema = new mongoose.Schema({
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },

  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },

  requestedAgeGroup: { type: String, required: true },
  requestedGender: { type: String, required: true },

  requestedTier: {
    type: String,
    enum: ["Gold", "Silver", "Bronze", "Custom"],
  },

  coachNotes: { type: String },

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  directorNotes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("TeamApplication", teamApplicationSchema);
