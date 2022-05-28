import {HttpModule, HttpService, Module} from "@nestjs/common";
import {MovieRepository} from "./movie.repository";
import {MovieController} from "./movie.controller";
import {MovieService} from "./movie.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OmdbService} from "../omdb/omdb.service";
import {OmdbModule} from "../omdb/omdb.module";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {JwtStrategy} from "./jwt.strategy";
import {UserRepository} from "../user/user.repository";
import {UserService} from "../user/user.service";
import {UserLogsService} from "../userLog/userLogs.service";
import {UserLogModule} from "../userLog/userLog.module";
import {UserLogsRepository} from "../userLog/userLogs.repository";

@Module({
    imports: [TypeOrmModule.forFeature([MovieRepository]),
        TypeOrmModule.forFeature([UserLogsRepository]), OmdbModule, HttpModule],
    controllers: [MovieController],
    providers: [MovieService, OmdbService, JwtAuthGuard, JwtStrategy, UserLogsService],
})
export class MovieModule {}
