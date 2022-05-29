import { Module } from '@nestjs/common';
import {MovieModule} from "./movie/movie.module";
import {DatabaseModule} from "./database/database.module";
import {ConfigModule} from "@nestjs/config";
import {PassportModule} from "@nestjs/passport";
import {UserTransactionLogModule} from "./user-transaction-log/user-transaction-log.module";


@Module({
  imports: [  ConfigModule.forRoot(),
    PassportModule,MovieModule, DatabaseModule, UserTransactionLogModule],
})
export class AppModule {}
