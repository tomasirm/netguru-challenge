import { Injectable } from '@nestjs/common';
import {UserDto} from "../user/user.dto";
import {UserRepository} from "../user/user.repository";
import {User} from "../user/user.entity";
import {Movie} from "../movie/movie.entity";
import {UserLogDto} from "./userLog.dto";
import {UserLogEntity} from "./userLog.entity";
import {UserLogsRepository} from "./userLogs.repository";
import {LessThan} from "typeorm";
import * as moment from "moment";

@Injectable()
export class UserLogsService {
    constructor(private readonly userLogsRepository: UserLogsRepository) {
    }

    async createUserLog(userLogEntity : UserLogEntity): Promise<UserLogEntity> {
        try {
            //const userLog = await this.userLogsRepository.create(userLogEntity);
            return this.userLogsRepository.save(userLogEntity);
        } catch (e) {
            console.log(e);
        }

    }

    async findUserLogCalendarMonth(userId: number): Promise<any> {
        try{
            const startOfMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm');
            const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD hh:mm');
            console.log('startOfMonth::'+startOfMonth + '---endOfMonth::'+endOfMonth+ '---userId::'+userId)

            return await this.userLogsRepository.createQueryBuilder('q')
                .where(`q.created_at BETWEEN '${startOfMonth}' AND '${endOfMonth}'`)
                .andWhere(`q.user_id = '${userId}'`)
                .getCount();
        }catch (e){
            console.log(e);
        }

    }

}
