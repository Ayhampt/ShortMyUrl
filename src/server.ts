import express from "express";
import { serverConfig } from "./config";
import v1Router from "./routers/v1/index.router";
import { genericErrorHandler } from "./middlewares/error.middleware";
import logger from "./config/logger";
import { attachCorrelationMiddleware } from "./middlewares/correlationId.middleware";
import { setupMailerWorker } from "./processors/email.processor";
import { NotificationDto } from "./dto/notification.dto";
import { addEmailToQueue } from "./producers/email.producer";

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(attachCorrelationMiddleware);
/**
 * Registering all the routes and their corresponding routes with out app server object
 */
app.use("/api/v1", v1Router);
app.use(genericErrorHandler);

app.listen(serverConfig.PORT, () => {
  logger.info(`Server running on port http://localhost:${serverConfig.PORT}`);
  logger.info(`press CTL+C to stop the Server`);
  setupMailerWorker;
  logger.info("mailer worker started");

  const sampleNotification: NotificationDto = {
    to: "ZBk6w@example.com",
    subject: "test subject",
    templateId: "test-template",
    params: {
      name: "joe Doe",
      orderId: 796732,
    },
  };
  addEmailToQueue(sampleNotification);
});
