import {HttpException, HttpService, HttpStatus, Injectable} from '@nestjs/common';
import {MovieRepository} from "./movie.repository";
import {MovieCreateRequestDto} from "./dto/movie-create-request.dto";
import {Movie} from "./movie.entity";
import {UserLogsService} from "../userLog/userLogs.service";
import {TransactionRoleEnum} from "../common/enums/transactionRoleEnum";
import {UserLogEntity} from "../userLog/userLog.entity";
import {UserDto} from "../auth/user.dto";
import {OmdbMovieDto} from "./dto/omdb-movie.dto";
import {lastValueFrom, map} from "rxjs";

@Injectable()
export class MovieService {
    constructor(private readonly movieRepository: MovieRepository,
                private readonly userLogsService: UserLogsService,
                private http: HttpService) {}

    async createMovie(movieCreateRequestDto: MovieCreateRequestDto, userDto: UserDto): Promise<Movie> {
        try{
            const userTransactions = await this.userLogsService.findUserLogCalendarMonth(userDto.userId);

            if(userTransactions >= TransactionRoleEnum[userDto.role.toUpperCase()]){
                throw new HttpException('User has exceeded the transaction limit',
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const omdbMovieData = await this.getMovie(movieCreateRequestDto.title);

            const movie = this.movieRepository.create(Movie.of(movieCreateRequestDto));
            movie.genre = omdbMovieData.Genre;
            movie.released = omdbMovieData.Released;
            movie.director = omdbMovieData.Director;

            const movieSaved = await this.movieRepository.save(movie);

            const userLogEntity = new UserLogEntity();
            userLogEntity.movie = movie;
            userLogEntity.userId = userDto.userId;
            await this.userLogsService.createUserLog(userLogEntity);

            return movieSaved;
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

    async getMovie(title): Promise<OmdbMovieDto> {
        const omdbApiKey = process.env.OMDB_API_KEY;
        const omdbApiurl = process.env.OMDB_API_URL;

        return lastValueFrom(this.http.get(`${omdbApiurl}/?t=${title}&apikey=${omdbApiKey}`)
            .pipe(
                map(response => response.data))
        );
    }
}
