import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

export const validateRequestBody = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      console.log("Request Body is valid");
      next();
    } catch (error) {
      res.status(400).json({
        message: "Invalid Request Body",
        success: false,
        error: error,
      });
    }
  };
};

export const validateQueryParams = (schema: ZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.query);
      console.log("Query Params is valid");
      next();
    } catch (error) {
      res.status(400).json({
        message: "Invalid Request Body",
        success: false,
        error: error,
      });
    }
  };
};
