import {HttpModule, HttpService, Module} from "@nestjs/common";
import {MovieRepository} from "./movie.repository";
import {MovieController} from "./movie.controller";
import {MovieService} from "./movie.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {JwtStrategy} from "../auth/jwt.strategy";
import {UserLogsService} from "../userLog/userLogs.service";
import {UserLogsRepository} from "../userLog/userLogs.repository";

@Module({
    imports: [TypeOrmModule.forFeature([MovieRepository]),
        TypeOrmModule.forFeature([UserLogsRepository]), HttpModule],
    controllers: [MovieController],
    providers: [MovieService, JwtAuthGuard, JwtStrategy, UserLogsService],
})
export class MovieModule {}
