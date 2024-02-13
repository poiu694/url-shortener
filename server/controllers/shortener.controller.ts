import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

import { ShortenerService } from '../service/shortener.service';
import type { Request, Response } from 'express';
import { photos } from './photos';
import { avatars } from './avatars';

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
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ msg: error.message, error }).end();
      } else {
        res.status(400).send({ msg: '예상치 못한 오류가 발생했습니다.', error }).end();
      }
    }
    return null;
  };

  public getOriginalUrlFromShortenedUrl = async (req: Request, res: Response) => {
    try {
      const { url } = req.params;
      if (!url) {
        res.status(400).send({ msg: 'url이 첨부되지 않았습니다.' }).end();
      }

      const existUrl = await this.shortenerService.getUrlByShortenUrl(url);
      if (existUrl) {
        res.status(200).send({ originalUrl: existUrl.originalUrl });
      } else {
        res.status(400).send({ msg: '유효하지 않은 url입니다.' }).end();
      }
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send({ msg: error.message, error }).end();
      } else {
        res.status(400).send({ msg: '예상치 못한 오류가 발생했습니다.', error }).end();
      }
    }
  };

  public test = (req: Request, res: Response) => {
    res.status(200).send({ ok: true, data: 'hi' });
  };

  public uploadImages = async (req: Request, res: Response) => {
    let datas;
    try {
      const arr = avatars;
      cloudinary.config({
        cloud_name: 'palette-easel',
      });
      datas = await Promise.all(
        arr.map((url) =>
          cloudinary.uploader.upload(url, {
            public_id: url.match(/\/ipfs\/([^?]+)/)?.[1] || undefined,
            folder: 'profile',
          })
        )
      );

      res.status(200).send({ ok: true, data: datas.map((data) => data?.public_id) });
    } catch (err) {
      console.log(err);
      res.status(200).send({ ok: false, data: [] });
    } finally {
      fs.writeFileSync(
        'data.json',
        JSON.stringify(
          datas.map((data) => data.public_id),
          null,
          2
        )
      );
    }
  };
}
