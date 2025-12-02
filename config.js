require("dotenv").config();

const PORT = process.env.PORT || 3002;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/tm_dev";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

module.exports = { PORT, MONGODB_URI, JWT_SECRET, CORS_ORIGIN };


