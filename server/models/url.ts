import { model, Schema } from 'mongoose';

export interface ShortURL {
  id: number;
  originalUrl: string;
  shortenUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const urlSchema = new Schema<ShortURL>(
  {
    id: { type: Number, required: true, unique: true },
    originalUrl: { type: String, required: true, unique: true },
    shortenUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UrlModel = model<ShortURL>('url', urlSchema);
