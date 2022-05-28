import {Controller, Get, HttpStatus, Query, Res} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {UserLogsService} from "./userLogs.service";

@ApiTags('api')
@Controller('user-logs')
export class UserLogController {
    constructor(private userLogsService: UserLogsService) {}


    @Get()
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiOkResponse({ description: 'Get user by ID'})
    async findByUserId(@Res() res, @Query() query) {
        console.log(query)
        const user = await this.userLogsService.findUserLogCalendarMonth(query.userId);

        return res.status(HttpStatus.OK).json(user);
    }

}
