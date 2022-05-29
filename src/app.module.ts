import { Module } from '@nestjs/common';
import {MovieModule} from "./movie/movie.module";
import {DatabaseModule} from "./database/database.module";
import {ConfigModule} from "@nestjs/config";
import {PassportModule} from "@nestjs/passport";
import {UserLogModule} from "./userLog/userLog.module";


@Module({
  imports: [  ConfigModule.forRoot(),
    PassportModule,MovieModule, DatabaseModule, UserLogModule],
})
export class AppModule {}
