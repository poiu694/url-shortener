import type { Request, Response } from 'express';

class ShortenerController {
  public toShortenUrl(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log(data);
    } catch (err) {
      res.status(400).send(err);
    }
    return null;
  }

  public test(req: Request, res: Response) {
    console.log('test');
    res.status(200).send({ ok: true, data: 'hi' });
  }
}

export default new ShortenerController();
