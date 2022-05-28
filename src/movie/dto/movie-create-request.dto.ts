import {ApiProperty} from "@nestjs/swagger";
import {IsDate, IsNotEmpty, IsString, Length} from "class-validator";

export class MovieCreateRequestDto{

    @IsNotEmpty({ message: 'title bust be not empty' })
    @IsString({ message: 'title must be string' })
    @Length(1, 50)
    @ApiProperty({ description: 'Title of the movie' })
    title: string;

    /*@IsNotEmpty({ message: 'director bust be not empty' })
    @IsString({ message: 'director must be string' })
    @Length(1, 50)
    @ApiProperty({ description: 'director' })
    director: string;

    @IsNotEmpty({ message: 'genre bust be not empty' })
    @IsString({ message: 'genre must be string' })
    @Length(1, 50)
    @ApiProperty({ description: 'genre' })
    genre: string;

    @IsNotEmpty({ message: 'released bust be not empty' })
    @IsDate({ message: 'released must be date' })
    @ApiProperty({ description: 'genre' })
    released: Date;*/
}
