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
    HttpException
} from "@nestjs/common";
import {ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {MovieCreateRequestDto} from "./dto/movie-create-request.dto";
import {MovieService} from "./movie.service";
import {Movie} from "./movie.entity";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {JwtStrategy} from "./jwt.strategy";
import {UserDto} from "../user/user.dto";

@ApiTags('api')
@Controller('movies')
export class MovieController {
    constructor(private movieService: MovieService) {}

    @Post()
    @ApiOperation({ summary: 'Create movie' })
    @ApiOkResponse({ description: 'Create movie' })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    public async addMovie(
        @Res() res,
        @Request() req,
        @Body() movieCreateRequestDto: MovieCreateRequestDto,
    ) {
        try {
            const userDto : UserDto = req.user;
            console.log(userDto);
            const movie = await this.movieService.createMovie(movieCreateRequestDto, userDto);
            return res.status(HttpStatus.OK).json({
                message: 'Movie has been created successfully',
                movie,
            });
        } catch (err) {
            console.log(err);
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: err.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    @ApiOperation({ summary: 'Get all movies' })
    @ApiOkResponse({ description: 'Get all movies', type: [Movie] })
    async findAll(@Res() res) {
        const movies = await this.movieService.findAll();

        return res.status(HttpStatus.OK).json(movies);
    }

}
