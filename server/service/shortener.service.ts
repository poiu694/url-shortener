import { base62 } from '../utils/base62';
import { ShortURL } from '../models/url';
import { ShortenerRepository } from '../repository/shortener.repository';

export class ShortenerService {
  PADDING: number;

  constructor(private readonly shortenerRepository: ShortenerRepository) {
    this.shortenerRepository = shortenerRepository;
    this.PADDING = 100_000_000_000;
  }

  public async getUrlByOriginalUrl(originalUrl: string): Promise<ShortURL | null> {
    try {
      const url = await this.shortenerRepository.getUrlByOriginalUrl(originalUrl);
      if (url) {
        return url;
      }
    } catch (error) {
      throw new Error(error);
    }
    return null;
  }

  public async getUrlByShortenUrl(shortenUrl: string): Promise<ShortURL | null> {
    try {
      const id = base62.decode(shortenUrl) - this.PADDING;
      const url = await this.shortenerRepository.getUrlById(id);
      if (url) {
        return url;
      }
    } catch (error) {
      throw new Error(error);
    }
    return null;
  }

  public async createUrl(originalUrl: string): Promise<ShortURL | null> {
    try {
      const count = await this.shortenerRepository.getCount();
      const url = await this.shortenerRepository.createUrl({
        id: count + 1,
        originalUrl,
        shortenUrl: base62.encode(count + 1 + this.PADDING),
      });
      if (url) {
        return url;
      }
    } catch (error) {
      throw new Error(error);
    }
    return null;
  }
}
