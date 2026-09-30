import { Url, IUrl } from "../models/Url";
export interface CreateUrl {
  originalUrl: string;
  shortUrl: string;
}

export interface UrlStats {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

export class UrlRepository {
  async create(data: CreateUrl): Promise<IUrl> {
    const url = new Url(data);
    await url.save();
    return url;
  }
  async findByShortUrl(shortUrl: string): Promise<IUrl | null> {
    return await Url.findOne({ shortUrl });
  }
  async findAll() {
    const urls = await Url.find()
      .select({
        _id: 1,
        originalUrl: 1,
        shortUrl: 1,
        clicks: 1,
        createdAt: 1,
        updatedAt: 1,
      })
      .sort({ createdAt: -1 });

    return urls.map((url) => ({
      id: url._id.toString() || "",
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    }));
  }
  async incrementClicks(shortUrl: string): Promise<void> {
    await Url.findOneAndUpdate(
      { shortUrl },
      { $inc: { clicks: 1 } },
      { new: true },
    );
    return;
  }
  async findStatsByShortUrl(shortUrl: string): Promise<UrlStats | null> {
    const url = await Url.findOne({ shortUrl }).select({
      originalUrl: 1,
      shortUrl: 1,
      clicks: 1,
      createdAt: 1,
      updatedAt: 1,
    });

    if (!url) {
      return null;
    }

    return {
      originalUrl: url.originalUrl,
      shortUrl: url.shortUrl,
      clicks: url.clicks,
      createdAt: url.createdAt,
      updatedAt: url.updatedAt,
    };
  }
}
