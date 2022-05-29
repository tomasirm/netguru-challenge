import {MovieController} from './movie.controller';
import {MovieService} from './movie.service';
import {Test, TestingModule} from "@nestjs/testing";
import {MovieCreateRequestDto} from "./dto/movie-create-request.dto";




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
        await movieController.addMovie( req, dto);
        expect(spyService.createMovie).toHaveBeenCalled();
    })

    it("calling findAll method", () => {
        movieController.findAll();
        expect(spyService.findAll).toHaveBeenCalled();
    })


});
