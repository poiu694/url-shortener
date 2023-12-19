import { ShortenerService } from '../service/shortener.service';
import type { Request, Response } from 'express';

export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {
    this.shortenerService = shortenerService;
  }

  public toShortenUrl = async (req: Request, res: Response) => {
    try {
      const { url } = req.body;
      if (!url) {
        res.status(400).send({ msg: 'url이 첨부되지 않았습니다.' }).end();
      }
      const existUrl = await this.shortenerService.getUrlByOriginalUrl(url);
      if (existUrl) {
        res.status(200).send({ url: existUrl, msg: '성공적으로 url을 줄였습니다.' }).end();
      } else {
        const createdUrl = await this.shortenerService.createUrl(url);
        res.status(200).send({ url: createdUrl, msg: '성공적으로 url을 줄였습니다.' }).end();
      }
    } catch (err) {
      res.status(400).send(err).end();
    }
    return null;
  };

  public test = (req: Request, res: Response) => {
    res.status(200).send({ ok: true, data: 'hi' });
  };
}
