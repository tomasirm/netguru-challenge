import { Module } from '@nestjs/common';
import {MovieModule} from "./movie/movie.module";
import {DatabaseModule} from "./database/database.module";
import {ConfigModule} from "@nestjs/config";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {UserLogModule} from "./userLog/userLog.module";
import {UserModule} from "./user/user.module";


@Module({
  imports: [  ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),MovieModule, DatabaseModule, UserLogModule, UserModule],
})
export class AppModule {}
