import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {UserLogEntity} from "../userLog/userLog.entity";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @ApiProperty({description: 'id'})
    id: number;

    @Column({length: 50})
    @ApiProperty({description: 'name'})
    name: string;

    @ApiProperty({description: 'userId'})
    @Column({name: 'user_id'})
    userId: number;

    @Column({length: 15})
    @ApiProperty({description: 'role'})
    role: string;

    /*@OneToMany(() => UserLogEntity, (userLog) => userLog.user)
    userLogs: UserLogEntity[]*/


    static of(params: Partial<User>): User {
        const user = new User();
        Object.assign(user, params);

        return user;
    }
}
