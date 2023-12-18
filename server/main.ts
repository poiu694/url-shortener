import express from 'express';
import type { Request, Response, Application, NextFunction } from 'express';

import { base62 } from './utils/base62';

const PORT = 8080;

export default class App {
  app: Application;
  server: ReturnType<Application['listen']>;

  constructor() {
    this.app = express();

    this.config();
  }

  private config() {
    this.app.use(cors);
  }

  public listen() {
    this.server = this.app.listen(PORT, () => {
      console.log('server start');
    });
  }
}

const ORIGIN = 'http://localhost:5173';
const OPTIONS_SUCCESS_STATUS = 204;
function cors(req: Request, res: Response, next: NextFunction) {
  const method = req.method && req.method.toUpperCase && req.method.toUpperCase();

  res.header('Access-Control-Allow-Origin', ORIGIN);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
  if (method === 'OPTIONS') {
    res.statusCode = OPTIONS_SUCCESS_STATUS;
    res.setHeader('Content-Length', 0);
    res.end();
    return;
  }
  next();
}
