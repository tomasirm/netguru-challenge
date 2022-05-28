import {ApiProperty} from "@nestjs/swagger";

export class OmdbRatingMovieDto {
    @ApiProperty({ description: 'Source' })
    Source: string;
    @ApiProperty({ description: 'Value' })
    Value: string;
}
