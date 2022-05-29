import {HttpModule, HttpService, Module} from "@nestjs/common";
import {MovieRepository} from "./movie.repository";
import {MovieController} from "./movie.controller";
import {MovieService} from "./movie.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {JwtStrategy} from "../auth/jwt.strategy";
import {UserTransactionLogService} from "../user-transaction-log/user-transaction-log.service";
import {UserTransactionLogRepository} from "../user-transaction-log/user-transaction-log.repository";

@Module({
    imports: [TypeOrmModule.forFeature([MovieRepository]),
        TypeOrmModule.forFeature([UserTransactionLogRepository]), HttpModule],
    controllers: [MovieController],
    providers: [MovieService, JwtAuthGuard, JwtStrategy, UserTransactionLogService],
})
export class MovieModule {}
