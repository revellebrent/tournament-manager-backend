const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: { validator: validator.isEmail, message: "Invalid email" },
    },
    password: { type: String, required: true, select: false },
    name: { type: String, required: true, minlength: 2, maxlength: 30 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
