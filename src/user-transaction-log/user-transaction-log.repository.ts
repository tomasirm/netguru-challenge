import {EntityRepository, Repository} from "typeorm";
import {UserTransactionLogEntity} from "./user-transaction-log.entity";

@EntityRepository(UserTransactionLogEntity)
export class UserTransactionLogRepository extends Repository<UserTransactionLogEntity>{}
