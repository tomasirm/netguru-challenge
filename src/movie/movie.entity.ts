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
import {UserLogEntity} from "../userLog/userLog.entity";

@Entity()
@Unique(["title", "director"])
export class Movie {

    @PrimaryGeneratedColumn()
    @ApiProperty({description: 'id'})
    id: number;

    @Column({length: 50})
    @ApiProperty({description: 'title'})
    title: string;

    @Column({length: 50})
    @ApiProperty({description: 'director'})
    director: string;

    @Column({length: 50})
    @ApiProperty({description: 'genre'})
    genre: string;

    @Column({type: 'date'})
    @ApiProperty({description: 'released'})
    released: Date;

    @CreateDateColumn({name: 'created_at'})
    @ApiProperty({description: 'createdAt'})
    createdAt;

    @UpdateDateColumn({name: 'updated_at'})
    @ApiProperty({description: 'updatedAt'})
    updatedAt;

    @OneToMany(() => UserLogEntity, (userLog) => userLog.movie)
    userLogs: UserLogEntity[]

    @BeforeInsert()
    nameToUpperCase() {
        this.title = this.title.toUpperCase();
    }

    static of(params: Partial<Movie>): Movie {
        const movie = new Movie();
        Object.assign(movie, params);

        return movie;
    }
}
