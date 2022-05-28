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
    @HttpCode(HttpStatus.CREATED)
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
            return await this.movieService.createMovie(movieCreateRequestDto, userDto);
            /*return res.status(HttpStatus.OK).json({
                message: 'Movie has been created successfully',
                movie,
            });*/
        } catch (err) {
            console.log(err);
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: err.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Get all movies' })
    @ApiOkResponse({ description: 'Get all movies', type: [Movie] })
    public async findAll() {
        try{
            return await this.movieService.findAll();
        }catch (err){
            console.log(err);
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: err.message,
            }, HttpStatus.BAD_REQUEST);
        }


        // return res.status(HttpStatus.OK).json(movies);
    }

}
