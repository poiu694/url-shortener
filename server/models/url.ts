import mongoose, { Schema } from 'mongoose';

const urlSchema = new Schema(
  {
    id: { type: Number, required: true, unique: true },
    originalUrl: { type: String, required: true, unique: true },
    shortenUrl: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const UrlModel = mongoose.model('url', urlSchema);
