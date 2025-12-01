const fs = require("fs");
const path = require("path");
const winston = require("winston");
const expressWinston = require("express-winston");

const logsDir = path.join(__dirname, "..", "logs");
function ensureLogsDir() {
  if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);
}

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({
      filename: path.join(logsDir, "request.log"),
    }),
  ],
  format: winston.format.json(),
  meta: true,
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: path.join(logsDir, "error.log") }),
  ],
  format: winston.format.json(),
});

module.exports = { requestLogger, errorLogger, ensureLogsDir };
