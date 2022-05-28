import {MovieService} from "./movie.service";
import {Test, TestingModule} from "@nestjs/testing";
import {MovieCreateRequestDto} from "./dto/movie-create-request.dto";
import {UserDto} from "../user/user.dto";

class ApiServiceMock {
    createMovie(dto: MovieCreateRequestDto) {
        return [];
    }
    findAll() {
        return [];
    }
}
describe.only("MovieService", () => {

    let movieService: MovieService;

    beforeAll(async () => {
        const ApiServiceProvider = {
            provide: MovieService,
            useClass: ApiServiceMock,
        }
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                MovieService, ApiServiceProvider
            ],
        }).compile();
        movieService = module.get<MovieService>(MovieService);
    })

    it('should call saveNote method with expected params', async () => {
        const createMovieSpy = jest.spyOn(movieService, 'createMovie');
        const dto = new MovieCreateRequestDto();
        const userDto = new UserDto();
        movieService.createMovie(dto, userDto);
        expect(createMovieSpy).toHaveBeenCalledWith(dto, userDto);
    });

    it('should call findOneNote method with expected param', async () => {
        const findOneNoteSpy = jest.spyOn(movieService, 'findAll');
        movieService.findAll();
        expect(findOneNoteSpy).toHaveBeenCalledWith();
    });
})
