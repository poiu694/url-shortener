import express from 'express';
import mongoose from 'mongoose';
import type { Request, Response, Application, NextFunction } from 'express';

import Mongo from './config/mongo.json';
import router from './routes/shortener.router';

const PORT = 8080;

export default class App {
  app: Application;
  mongoose: typeof mongoose;
  server: ReturnType<Application['listen']>;

  constructor() {
    this.app = express();

    this.config();
    this.dbConnect();
  }

  private config() {
    this.app.use(cors);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(router);
  }

  private async dbConnect() {
    try {
      this.mongoose = await mongoose.connect(Mongo.srv);
    } catch (err) {
      console.log(err);
    }
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
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
  if (method === 'OPTIONS') {
    res.statusCode = OPTIONS_SUCCESS_STATUS;
    res.setHeader('Content-Length', 0);
    res.end();
    return;
  }
  next();
}
