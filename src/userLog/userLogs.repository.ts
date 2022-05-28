import {EntityRepository, Repository} from "typeorm";
import {UserLogEntity} from "./userLog.entity";

@EntityRepository(UserLogEntity)
export class UserLogsRepository extends Repository<UserLogEntity>{}
