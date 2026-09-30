import winston from "winston";
import { getCorelationId } from "../utils/helpers/request.helper";
import DailyRotateFile from "winston-daily-rotate-file";

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:MM:SS" }),
    winston.format.json(),

    winston.format.printf(({ level, message, label, timestamp, ...data }) => {
      const output = {
        level,
        message,
        label,
        correlationId: getCorelationId(),
        timestamp,
        data,
      };
      return JSON.stringify(output);
    }),
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
      filename: "logs/%DATE%-app.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      maxSize: "20m",
    }),
  ],
});
export default logger;
