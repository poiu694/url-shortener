import express from 'express';
import type { Application } from 'express';

const PORT = 8080;

export default class App {
  app: Application;
  server: ReturnType<Application['listen']>;

  constructor() {
    this.app = express();
  }

  public listen() {
    this.server = this.app.listen(PORT, () => {
      console.log('server start');
    });
  }
}
