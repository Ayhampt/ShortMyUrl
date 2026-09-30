import { NextFunction, Request, Response } from "express";
import { InternalServerError } from "../utils/errors/app.error";
import logger from "../config/logger";

export const pingHandler = async (req: Request, res: Response,next:NextFunction) => {
  try {
    logger.info("pong hit");
    res.status(200).json({
      message:"pong"
    })
  } catch (error) {
    throw new InternalServerError("something went wrong")
  }
};
