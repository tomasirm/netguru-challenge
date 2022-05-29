import {Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {MovieEntity} from "../movie/movie.entity";
import {ApiProperty} from "@nestjs/swagger";
import {UserTransactionLogDto} from "./user-transaction-log.dto";

@Entity('user_transaction_log')
export class UserTransactionLogEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty({description: 'Primary Key'})
    id: number;

    @Column({name: 'user_id', nullable: false})
    @ApiProperty({description: 'User ID'})
    userId: number;

    @ManyToOne(() => MovieEntity, (Movie) => Movie.userLogs, { cascade: true })
    @JoinColumn({ name: "movie_id" })
    movie: MovieEntity;

    @CreateDateColumn({name: 'created_at', nullable: false})
    @ApiProperty({description: 'Created at'})
    createdAt;

    static of(params: Partial<UserTransactionLogEntity>): UserTransactionLogEntity {
        const userLogEntity = new UserTransactionLogEntity();
        Object.assign(userLogEntity, params);

        return userLogEntity;
    }

    static toDto(params: Partial<UserTransactionLogEntity>): UserTransactionLogDto {
        const userLogDto = new UserTransactionLogDto();
        Object.assign(params, userLogDto);

        return userLogDto;
    }
}
