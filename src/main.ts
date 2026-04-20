import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from "cookie-parser";
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({}));

  const PORT = 3069;
  await app.listen(PORT, () => {
    console.log(`[SUCCESS] BE started successfully at http:/localhost:${PORT}`)
  });
}
bootstrap();
