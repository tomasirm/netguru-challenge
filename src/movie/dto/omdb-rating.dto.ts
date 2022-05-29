import {ApiProperty} from "@nestjs/swagger";

export class OmdbRatingMovieDto {
    @ApiProperty({ description: 'Source of rating' })
    Source: string;
    @ApiProperty({ description: 'Value of rating' })
    Value: string;
}
