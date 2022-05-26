import {Body, Controller, Get, HttpStatus, NotFoundException, Param, Post, Query, Res} from "@nestjs/common";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {MovieCreateRequestDto} from "./dto/movie-create-request.dto";
import {MovieService} from "./movie.service";
import {Movie} from "./movie.entity";

@ApiTags('api')
@Controller('movies')
export class MovieController {
    constructor(private movieService: MovieService) {}

    @Post()
    public async addMovie(
        @Res() res,
        @Body() movieCreateRequestDto: MovieCreateRequestDto,
    ) {
        try {
            const movie = await this.movieService.createMovie(movieCreateRequestDto);
            return res.status(HttpStatus.OK).json({
                message: 'Movie has been created successfully',
                movie,
            });
        } catch (err) {
            return res.status(HttpStatus.BAD_REQUEST).json({
                message: 'Error: Movie not created!',
                status: 400,
            });
        }
    }

    @Get()
    @ApiOperation({ summary: 'api' })
    @ApiOkResponse({ description: 'Get all movies', type: [Movie] })
    async findAll(@Res() res) {
        const users = await this.movieService.findAll();

        return res.status(HttpStatus.OK).json(users);
    }

}
