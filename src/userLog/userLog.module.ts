import { Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserLogsRepository} from "./userLogs.repository";
import {UserLogsService} from "./userLogs.service";
import {UserLogController} from "./userLog.controller";

@Module({
    imports: [TypeOrmModule.forFeature([UserLogsRepository])],
    providers: [UserLogsService],
    controllers: [UserLogController]
})
export class UserLogModule {}
