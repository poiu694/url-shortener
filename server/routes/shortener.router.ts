import { Router } from 'express';

import { UrlModel } from '../models/url';
import { ShortenerService } from '../service/shortener.service';
import { ShortenerRepository } from '../repository/shortener.repository';
import { ShortenerController } from '../controllers/shortener.controller';

const router = Router();

const shortenerRepository = new ShortenerRepository(UrlModel);
const shortenerService = new ShortenerService(shortenerRepository);
const shortenerController = new ShortenerController(shortenerService);

router.get('/api/test', shortenerController.test);
router.get('/api/images', shortenerController.uploadImages);
router.post('/api/short-url', shortenerController.toShortenUrl);
router.get('/api/route/:url', shortenerController.getOriginalUrlFromShortenedUrl);

export default router;
