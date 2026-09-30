import express from "express";
import { serverConfig } from "./config";
import v1Router from "./routers/v1/index.router";
import { genericErrorHandler } from "./middlewares/error.middleware";
import logger from "./config/logger";
import { attachCorrelationMiddleware } from "./middlewares/correlationId.middleware";
import { InitRedis } from "./config/redis";
import { connectToDatabase } from "./config/db";
const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(attachCorrelationMiddleware);
/**
 * Registering all the routes and their corresponding routes with out app server object
 */
app.use("/api/v1", v1Router);
app.use(genericErrorHandler);

app.listen(serverConfig.PORT, async () => {
  logger.info(`Server running on port http://localhost:${serverConfig.PORT}`);
  logger.info(`press CTL+C to stop the Server`);
  await InitRedis();
  await connectToDatabase();
});
