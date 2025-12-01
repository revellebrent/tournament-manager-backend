const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 120 },
    mime: {
      type: String,
      required: true,
      enum: ["image/jpeg", "application/pdf"],
    },
    dataUrl: { type: String, required: true },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      select: false,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("PlayerCard", cardSchema);
