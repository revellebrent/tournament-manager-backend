const mongoose = require("mongoose");

const playerCardSchema = new mongoose.Schema({
  ownerEmail: { type: String, required: true },
  ownerName: { type: String },
  ownerRole: { type: String, enum: ["parent", "coach"], required: true },

  playerName: { type: String },
  birthYear: { type: Number },
  jerseyNumber: { type: String },

  // URL to uploaded image/file
  fileUrl: { type: String, required: true },

  // Coaches the parent shares the card with
  sharedWith: [
    {
      type: String, // coach email
    }
  ],

  // Assigned by coaches — player can join multiple teams
  assignedTeams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    }
  ],

  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  approvedBy: { type: String },

}, { timestamps: true });

module.exports = mongoose.model("PlayerCard", playerCardSchema);



