import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({origin: ['http://e1r9p3.1337.ma:3001', 'http://e1r9p3.1337.ma:5173'], credentials: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'});
    app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.useWebSocketAdapter(new IoAdapter(app));
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    index: false,
    prefix: '/public',
  });
  await app.listen(3000);
}
bootstrap();
