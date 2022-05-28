import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {setupSwagger} from "./util/swagger";

async function bootstrap() {
  console.log('__dirname::'+__dirname);
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  setupSwagger(app);
  console.log('OMDB_API_KEY::'+process.env.OMDB_API_KEY);
  await app.listen(3000);
}
bootstrap();
