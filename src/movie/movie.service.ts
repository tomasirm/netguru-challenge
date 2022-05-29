import {HttpException, HttpService, HttpStatus, Injectable} from '@nestjs/common';
import {MovieRepository} from "./movie.repository";
import {MovieCreateRequestDto} from "./dto/movie-create-request.dto";
import {MovieEntity} from "./movie.entity";
import {UserTransactionLogService} from "../user-transaction-log/user-transaction-log.service";
import {TransactionRoleEnum} from "../common/enums/transactionRoleEnum";
import {UserTransactionLogEntity} from "../user-transaction-log/user-transaction-log.entity";
import {UserDto} from "../auth/user.dto";
import {OmdbMovieDto} from "./dto/omdb-movie.dto";
import {lastValueFrom, map} from "rxjs";
import {MovieDto} from "./dto/movie.dto";

@Injectable()
export class MovieService {
    constructor(private readonly movieRepository: MovieRepository,
                private readonly userLogsService: UserTransactionLogService,
                private http: HttpService) {}

    async createMovie(movieCreateRequestDto: MovieCreateRequestDto, userDto: UserDto): Promise<MovieEntity> {
        try{
            const userTransactions = await this.userLogsService.findUserLogCalendarMonth(userDto.userId);

            if(userTransactions >= TransactionRoleEnum[userDto.role.toUpperCase()]){
                throw new HttpException('User has exceeded the transaction limit',
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const movieDataOmdb = await this.getMovieDataOMDB(movieCreateRequestDto.title);

            if(movieDataOmdb.Error === 'MovieEntity not found!'){
                throw new HttpException('MovieEntity not found in OMDB records',
                    HttpStatus.INTERNAL_SERVER_ERROR);
            }

            const movieEntity = this.movieRepository.create(MovieEntity.of(movieCreateRequestDto));
            movieEntity.genre = movieDataOmdb.Genre;
            movieEntity.released = movieDataOmdb.Released;
            movieEntity.director = movieDataOmdb.Director;

            const movieCreated = await this.movieRepository.save(movieEntity);

            const userTransactionLogEntity = new UserTransactionLogEntity();
            userTransactionLogEntity.movie = movieEntity;
            userTransactionLogEntity.userId = userDto.userId;
            await this.userLogsService.createUserLog(userTransactionLogEntity);

            return movieCreated;
        }catch (e){
            throw new HttpException(e,
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findAll(): Promise<MovieDto[]> {
        try {
            return await this.movieRepository.find();
        }catch (e){
            throw new HttpException(e,
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getMovieDataOMDB(title): Promise<OmdbMovieDto> {
        const omdbApiKey = process.env.OMDB_API_KEY;
        const omdbApiurl = process.env.OMDB_API_URL;

        return lastValueFrom(this.http.get(`${omdbApiurl}/?t=${title}&apikey=${omdbApiKey}`)
            .pipe(
                map(response => response.data))
        );
    }
}
