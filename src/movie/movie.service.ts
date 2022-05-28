import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {MovieRepository} from "./movie.repository";
import {MovieCreateRequestDto} from "./dto/movie-create-request.dto";
import {Movie} from "./movie.entity";
import {UserLogsService} from "../userLog/userLogs.service";
import {TransactionRoleEnum} from "../enums/transactionRoleEnum";
import {OmdbService} from "../omdb/omdb.service";
import {UserLogEntity} from "../userLog/userLog.entity";
import {UserDto} from "../user/user.dto";

@Injectable()
export class MovieService {
    constructor(private readonly movieRepository: MovieRepository,
                private readonly userLogsService: UserLogsService,
                private readonly omdbService: OmdbService) {}

    async createMovie(movieCreateRequestDto: MovieCreateRequestDto, userDto: UserDto): Promise<Movie> {
        try{
            const userTransactions = await this.userLogsService.findUserLogCalendarMonth(userDto.userId);

            if(userTransactions >= TransactionRoleEnum[userDto.role.toUpperCase()]){
                throw new HttpException('User has exceeded the transaction limit',
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }

            /*const movieFound = {Released: "22 Mar 1985",
                Runtime: "113 min",
                Genre: "Drama, Sci-Fi",
                Director: "nose"};*/

            const movieFound = await this.omdbService.getMovie(movieCreateRequestDto.title);
            const movie = this.movieRepository.create(Movie.of(movieCreateRequestDto));
            movie.genre = movieFound.Genre;
            movie.released = movieFound.Released;
            movie.director = movieFound.Director;

            const moviePersisted =  await this.movieRepository.save(movie);

            const userLogEntity = new UserLogEntity();
            userLogEntity.movie = movie;
            userLogEntity.userId = userDto.userId;
            await this.userLogsService.createUserLog(userLogEntity);

            return moviePersisted;

        }catch (e){
            throw new HttpException(e,
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<Movie[]> {
        return this.movieRepository.find();
    }

}
