import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {MovieRepository} from "./movie.repository";
import {MovieCreateRequestDto} from "./dto/movie-create-request.dto";
import {Movie} from "./movie.entity";
import {UserLogsService} from "../userLog/userLogs.service";
import {TransactionRoleEnum} from "../enums/transactionRoleEnum";
import {OmdbService} from "../omdb/omdb.service";
import {UserLogEntity} from "../userLog/userLog.entity";
import {UserDto} from "../user/user.dto";
import {OmdbMovieDto} from "../omdb/dto/omdb-movie.dto";
import {lastValueFrom, map} from "rxjs";

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

            const omdbMovieData = await this.omdbService.getMovie(movieCreateRequestDto.title);

            const movie = this.movieRepository.create(Movie.of(movieCreateRequestDto));
            movie.genre = omdbMovieData.Genre;
            movie.released = omdbMovieData.Released;
            movie.director = omdbMovieData.Director;
            await this.movieRepository.save(movie);

            const userLogEntity = new UserLogEntity();
            userLogEntity.movie = movie;
            userLogEntity.userId = userDto.userId;
            await this.userLogsService.createUserLog(userLogEntity);

            return movie;

        }catch (e){
            throw new HttpException(e,
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<Movie[]> {
        try {
            return await this.movieRepository.find();
        }catch (e){
            throw new HttpException(e,
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
