const { v4: uuidv4 } = require("uuid");
import { asyncLocalStorage } from "../utils/helpers/request.helper";
import { NextFunction, Request, Response } from "express";

export const attachCorrelationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const correlationId = uuidv4();

  req.headers["x-correlation-Id"] = correlationId;

  asyncLocalStorage.run({ correlationId: correlationId }, () => {
    next();
  });
};
