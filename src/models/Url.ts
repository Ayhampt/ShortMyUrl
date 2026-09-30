import mongoose, { Schema, Document } from "mongoose";

export interface IUrl extends Document {
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
}

const urlSchema: Schema<IUrl> = new Schema(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
  },
  { timestamps: true },
);

urlSchema.index({ originalUrl: 1 });

export const Url = mongoose.model<IUrl>("Url", urlSchema);
