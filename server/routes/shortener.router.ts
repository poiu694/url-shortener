import { Router } from 'express';

import shortenerController from '../controllers/shortener.controller';

const router = Router();

router.get('/api/test', shortenerController.test);
router.post('/api/short-url', shortenerController.toShortenUrl);

export default router;
