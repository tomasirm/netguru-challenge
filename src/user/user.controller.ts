import { Controller, Get, HttpStatus, Res} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {UserService} from "./user.service";
import {User} from "./user.entity";

@ApiTags('api')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}


    @Get()
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiOkResponse({ description: 'Get user by ID', type: User })
    async findById(@Res() res) {
        const user = await this.userService.findUserByUserId(123);

        return res.status(HttpStatus.OK).json(user);
    }

}
