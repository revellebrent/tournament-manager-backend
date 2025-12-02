const express = require("express");
const cors = require("cors");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { errorHandler } = require("./middlewares/errors");
const routes = require("./routes");

const app = express();

// Core middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use(requestLogger);

app.get("/", (req, res) => {
  res.send("Tournament Manager Backend is running.");
});

// Main API routes
app.use("/api", routes);

// Error logging
app.use(errorLogger);

// Centralized error handler (must be last)
app.use(errorHandler);

module.exports = app;
