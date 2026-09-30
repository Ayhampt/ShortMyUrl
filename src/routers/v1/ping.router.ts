import express from "express";
import { pingHandler } from "../../controllers/ping.controller";
import { validateRequestBody } from "../../validators/index.validator";
import { pingSchema } from "../../validators/ping.validator";

const pingRouter = express.Router();

pingRouter.get("/", validateRequestBody(pingSchema), pingHandler);

pingRouter.get("/health", (req, res) => {
  res.status(200).send("OK");
});

export default pingRouter;
