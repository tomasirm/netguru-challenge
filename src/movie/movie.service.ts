import { Injectable } from '@nestjs/common';
import {MovieRepository} from "./movie.repository";
import {MovieCreateRequestDto} from "./dto/movie-create-request.dto";
import {Movie} from "./movie.entity";
import {OmdbService} from "../omdb/omdb.service";

@Injectable()
export class MovieService {
    constructor(private readonly movieRepository: MovieRepository,
                private readonly omdbService: OmdbService) {}

    async createMovie(movieCreateRequestDto: MovieCreateRequestDto): Promise<Movie> {
        try{
            const movieFound = await this.omdbService.getMovie(movieCreateRequestDto.title)
            console.log('movieFound::'+JSON.stringify(movieFound));
            const movie = this.movieRepository.create(Movie.of(movieCreateRequestDto));

            return this.movieRepository.save(movie);
        }catch (e){
            console.log(e);
        }

    }

    async findAll(): Promise<Movie[]> {
        return this.movieRepository.find();
    }
}
