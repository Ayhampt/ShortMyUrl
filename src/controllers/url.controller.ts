import { z } from "zod";
import { publicProcedure } from "../routers/trpc/context";
import { CacheRepository } from "../repositories/cache.repository";
import { UrlRepository } from "../repositories/url.repository";
import { UrlService } from "../services/url.service";
import logger from "../config/logger";
import { InternalServerError } from "../utils/errors/app.error";
import { Request, Response, NextFunction } from "express";

const urlService = new UrlService(new UrlRepository(), new CacheRepository());

export const urlController = {
  create: publicProcedure
    .input(
      z.object({
        originalUrl: z.url("Invalid URL"),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const result = await urlService.createShortUrl(input.originalUrl);
        return result;
      } catch (error) {
        logger.error("Error creating short URL:", error);
        throw new InternalServerError("Failed to create short URL");
      }
    }),
  getOriginalUrl: publicProcedure
    .input(
      z.object({
        shortUrl: z.string().min(1, "Short URL is required"),
      }),
    )
    .query(async ({ input }) => {
      try {
        const result = await urlService.getOriginalUrl(input.shortUrl);
        return result;
      } catch (error) {
        logger.error("Error retrieving original URL:", error);
        throw new InternalServerError("Failed to retrieve original URL");
      }
    }),
};

export async function redirectUrl(
  req: Request<{ shortUrl: string }>,
  res: Response,
  next: NextFunction,
) {
  const { shortUrl } = req.params;
  const urlService = new UrlService(new UrlRepository(), new CacheRepository());

  const url = await urlService.getOriginalUrl(shortUrl);
  if (!url) {
    res.status(404).json({ message: "Short URL not found", success: false });
    return;
  }
  res.redirect(url.originalUrl);
}
