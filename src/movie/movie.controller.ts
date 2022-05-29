import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Request,
    Param,
    Post,
    Query,
    Res,
    UseGuards,
    HttpException, HttpCode
} from "@nestjs/common";
import {ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {MovieCreateRequestDto} from "./dto/movie-create-request.dto";
import {MovieService} from "./movie.service";
import {MovieEntity} from "./movie.entity";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {JwtStrategy} from "../auth/jwt.strategy";
import {UserDto} from "../auth/user.dto";
import {MovieDto} from "./dto/movie.dto";

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
    constructor(private movieService: MovieService) {
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary: 'Create movie'})
    @ApiOkResponse({description: 'Create movie'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    public async addMovie(
        @Request() req,
        @Body() movieCreateRequestDto: MovieCreateRequestDto,
    ): Promise<MovieEntity> {
        try {
            const userDto: UserDto = req.user;
            const movie = await this.movieService.createMovie(movieCreateRequestDto, userDto);
            return movie;
        } catch (err) {
            console.log(err);
            throw new HttpException({
                error: err.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: 'Get all movies'})
    @ApiOkResponse({description: 'Get all movies', type: [MovieDto]})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    public async findAll(): Promise<MovieDto[]> {
        try {
            return await this.movieService.findAll();
        } catch (err) {
            throw new HttpException({
                error: err.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

}
