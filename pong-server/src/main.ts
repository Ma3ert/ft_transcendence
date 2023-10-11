import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: ['http://localhost:3001', 'http://127.0.0.1:5173'], credentials: true, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'});
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(passport.initialize());
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(3000);
}
bootstrap();
