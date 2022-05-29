import { Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserTransactionLogRepository} from "./user-transaction-log.repository";
import {UserTransactionLogService} from "./user-transaction-log.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserTransactionLogRepository])],
    providers: [UserTransactionLogService]
})
export class UserTransactionLogModule {}
