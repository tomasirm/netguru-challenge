import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {setupSwagger} from "./util/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  setupSwagger(app);
  await app.listen(process.env.APP_PORT);
}
bootstrap();
