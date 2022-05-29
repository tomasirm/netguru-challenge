import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserTransactionLogEntity} from "./user-transaction-log.entity";
import {UserTransactionLogRepository} from "./user-transaction-log.repository";
import * as moment from "moment";

@Injectable()
export class UserTransactionLogService {
    constructor(private readonly userLogsRepository: UserTransactionLogRepository) {
    }

    async createUserLog(userLogEntity: UserTransactionLogEntity): Promise<UserTransactionLogEntity> {
        try {
            return this.userLogsRepository.save(userLogEntity);
        } catch (e) {
            throw new HttpException('Error saving user transaction log',
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async findUserLogCalendarMonth(userId: number): Promise<number> {
        try {
            const startOfMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm');
            const endOfMonth = moment().endOf('month').format('YYYY-MM-DD hh:mm');

            return await this.userLogsRepository.createQueryBuilder('q')
                .where(`q.created_at BETWEEN '${startOfMonth}' AND '${endOfMonth}'`)
                .andWhere(`q.user_id = '${userId}'`)
                .getCount();

        } catch (e) {
            throw new HttpException('Error finding user transaction logs',
                HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
