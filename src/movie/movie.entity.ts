import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn
} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';
import {UserTransactionLogEntity} from "../user-transaction-log/user-transaction-log.entity";

@Entity('movie')
@Unique(["title", "director"])
export class MovieEntity {

    @PrimaryGeneratedColumn()
    @ApiProperty({description: 'Primary Key'})
    id: number;

    @Column({length: 50, nullable: false})
    @ApiProperty({description: 'Title (Unique Key)'})
    title: string;

    @Column({length: 50, nullable: false})
    @ApiProperty({description: 'Director (Unique Key)'})
    director: string;

    @Column({length: 50, nullable: false})
    @ApiProperty({description: 'Genre'})
    genre: string;

    @Column({type: 'date', nullable: false})
    @ApiProperty({description: 'Released date'})
    released: Date;

    @OneToMany(() => UserTransactionLogEntity, (userLog) => userLog.movie)
    @ApiProperty()
    userLogs: UserTransactionLogEntity[]

    @BeforeInsert()
    nameToUpperCase() {
        this.title = this.title.toUpperCase();
    }

    static of(params: Partial<MovieEntity>): MovieEntity {
        const movie = new MovieEntity();
        Object.assign(movie, params);

        return movie;
    }
}
