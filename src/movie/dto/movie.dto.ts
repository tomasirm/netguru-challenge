import {ApiProperty} from "@nestjs/swagger";

export class MovieDto{

    @ApiProperty({ description: 'Title of the movie' })
    title: string;

    @ApiProperty({ description: 'Director of the movie' })
    director: string;

    @ApiProperty({ description: 'Type of genre' })
    genre: string;

    @ApiProperty({ description: 'Release date' })
    released: Date;
}
