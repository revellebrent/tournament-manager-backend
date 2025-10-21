require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { errors: celebrateErrors } = require("celebrate");
const routes = require("./routes");
const {
  requestLogger,
  errorLogger,
  ensureLogsDir,
} = require("./middlewares/logger");
const errorHandler = require("./middlewares/errors");
const { PORT, MONGODB_URI, CORS_ORIGIN } = require("./config");

const app = express();
ensureLogsDir();

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Mongo Connected"))
  .catch((e) => {
    console.error("Mongo connection error:", e.message);
    process.exit(1);
  });

app.use(helmet());
app.use(
  cors({
    origin: CORS_ORIGIN ? CORS_ORIGIN.split(",") : true,
    credentials: true,
  }),
);
app.use(express.json({ limit: "5mb" }));

app.use(requestLogger);
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use("/api", routes);

app.use(errorLogger);
app.use(celebrateErrors());
app.use(errorHandler);

app.listen(PORT, () => console.log(`🚀 API on http://localhost:${PORT}/api`));
