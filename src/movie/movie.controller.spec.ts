import {MovieController} from './movie.controller';
import {MovieService} from './movie.service';
import {MovieRepository} from "./movie.repository";
import {UserLogsService} from "../userLog/userLogs.service";
import {OmdbService} from "../omdb/omdb.service";
import {Movie} from "./movie.entity";
import {Test, TestingModule} from "@nestjs/testing";
import {Repository} from "typeorm";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {JwtStrategy} from "./jwt.strategy";
import {getRepositoryToken} from "@nestjs/typeorm";
import {HttpModule, HttpService, Req, Res} from "@nestjs/common";
import {UserLogsRepository} from "../userLog/userLogs.repository";
import {AXIOS_INSTANCE_TOKEN} from "@nestjs/common/http/http.constants";
import {MovieCreateRequestDto} from "./dto/movie-create-request.dto";
import {UserDto} from "../user/user.dto";




describe("MovieController Unit Tests", () => {
    let movieController: MovieController;
    let spyService: MovieService
    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: MovieService,
            useFactory: () => ({
                findAll: jest.fn(() => []),
                createMovie: jest.fn(() => {status: 200}),
            })
        }
        const app: TestingModule = await Test.createTestingModule({
            controllers: [MovieController],
            providers: [MovieService, ApiServiceProvider],
        }).compile();

        movieController = app.get<MovieController>(MovieController);
        spyService = app.get<MovieService>(MovieService);
    })

    it("calling addMovie method", async () => {
        const dto = new MovieCreateRequestDto();
        const req = {user: {userId: 1, name: 'Tomas'}};
        await movieController.addMovie(null, req, dto);
        expect(spyService.createMovie).toHaveBeenCalled();
    })

    it("calling findAll method", () => {
        movieController.findAll();
        expect(spyService.findAll).toHaveBeenCalled();
    })


});
