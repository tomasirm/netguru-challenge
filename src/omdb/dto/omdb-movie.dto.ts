import {ApiProperty} from "@nestjs/swagger";
import {OmdbRatingMovieDto} from "./omdb-rating-movie.dto";

export class OmdbMovieDto {
    @ApiProperty({ description: 'Title' })
    Title: string;
    @ApiProperty({ description: 'Year' })
    Year: string;
    @ApiProperty({ description: 'Rated' })
    Rated: string;
    @ApiProperty({ description: 'Released' })
    Released: Date;
    @ApiProperty({ description: 'Runtime' })
    Runtime: string;
    @ApiProperty({ description: 'Genre' })
    Genre: string;
    @ApiProperty({ description: 'Director' })
    Director: string;
    @ApiProperty({ description: 'Writer' })
    Writer: string;
    @ApiProperty({ description: 'Actors' })
    Actors: string;
    @ApiProperty({ description: 'Plot' })
    Plot: string;
    @ApiProperty({ description: 'Language' })
    Language: string;
    @ApiProperty({ description: 'Country' })
    Country: string;
    @ApiProperty({ description: 'Awards' })
    Awards: string;
    @ApiProperty({ description: 'Poster' })
    Poster: string;
    @ApiProperty({ description: 'Metascore' })
    Metascore: string;
    @ApiProperty({ description: 'imdbRating' })
    imdbRating: string;
    @ApiProperty({ description: 'imdbVotes' })
    imdbVotes: string;
    @ApiProperty({ description: 'imdbID' })
    imdbID: string;
    @ApiProperty({ description: 'Type' })
    Type: string;
    @ApiProperty({ description: 'DVD' })
    DVD: string;
    @ApiProperty({ description: 'BoxOffice' })
    BoxOffice: string;
    @ApiProperty({ description: 'Production' })
    Production: string;
    @ApiProperty({ description: 'Website' })
    Website: string;
    @ApiProperty({ description: 'Response' })
    Response: string;
    @ApiProperty({ description: 'Ratings' })
    Ratings: OmdbRatingMovieDto[];
}
