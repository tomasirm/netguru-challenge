import {HttpModule, HttpService, Module} from "@nestjs/common";
import {MovieRepository} from "./movie.repository";
import {MovieController} from "./movie.controller";
import {MovieService} from "./movie.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {OmdbService} from "../omdb/omdb.service";
import {OmdbModule} from "../omdb/omdb.module";

@Module({
    imports: [TypeOrmModule.forFeature([MovieRepository]), OmdbModule, HttpModule],
    controllers: [MovieController],
    providers: [MovieService, OmdbService],
})
export class MovieModule {}
