// Environment variables
import { HTTP_PORT } from '@src/_config/environment';

// Dependencies
import { InversifyExpressServer } from 'inversify-express-utils';
import { Container } from 'inversify';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import compression from 'compression';
import morgan from 'morgan';
import { mongodbConnect } from '@database/mongoDB/mongodbConnector';

// Controllers
import '@http/controllers/UnavailableController';
import '@src/UserModule/userController';
import '@src/BeerModule/beerController';

// Http Server
export class HttpServer {
  private serverBuilder: InversifyExpressServer;
  private server: express.Application | undefined;
  private connectMongoDB = false;

  constructor(private readonly container: Container) {
    this.serverBuilder = new InversifyExpressServer(this.container);
    console.clear();
  }

  mongoDB() {
    this.connectMongoDB = true;
  }

  config() {
    this.serverBuilder.setConfig((app: any) => {
      app.use(morgan('combined'));
      app.use(express.json());
      app.use(cors());
      app.use(helmet());
      app.use(hpp());
      app.use(compression());
    });

    console.log('Server configuration loaded...');
  }

  build() {
    this.server = this.serverBuilder.build();
  }

  async start() {
    if (this.connectMongoDB) {
      await mongodbConnect();
    }

    if (this.server) {
      this.server.listen(HTTP_PORT, () => {
        console.log(`🚀 Backend server listening on port ${HTTP_PORT}`);
      });
    } else {
      console.log('ERROR: Server should be builded before start');
    }
  }
}
