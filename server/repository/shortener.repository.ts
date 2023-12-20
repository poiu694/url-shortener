import { UrlModel } from '../models/url';
import type { ShortURL } from '../models/url';

export class ShortenerRepository {
  constructor(private readonly urlModel: typeof UrlModel) {
    this.urlModel = urlModel;
  }

  public getUrlByOriginalUrl = async (url: string): Promise<ShortURL | null> => {
    try {
      const existUrl = await this.urlModel.findOne({ originalUrl: url });
      if (existUrl) {
        return existUrl;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    return null;
  };

  public getUrlById = async (id: number): Promise<ShortURL | null> => {
    try {
      const existUrl = await this.urlModel.findOne({ id });
      if (existUrl) {
        return existUrl;
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    return null;
  };

  public getCount = async (): Promise<number | null> => {
    try {
      const count = await this.urlModel.countDocuments();
      return count;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    return null;
  };

  public createUrl = async (
    url: Pick<ShortURL, 'id' | 'originalUrl' | 'shortenUrl'>
  ): Promise<ShortURL | null> => {
    try {
      const createdUrl = new UrlModel(url);
      await createdUrl.save();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
    return null;
  };
}
