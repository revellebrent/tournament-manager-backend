require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
const { PORT, MONGODB_URI } = require("./config");

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Tournament Manager backend running on port ${PORT}`);
});
