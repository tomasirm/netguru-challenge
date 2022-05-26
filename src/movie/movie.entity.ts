import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {ApiProperty} from '@nestjs/swagger';

@Entity()
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

    @CreateDateColumn()
    @ApiProperty({description: 'createdAt'})
    createdAt;

    @UpdateDateColumn()
    @ApiProperty({description: 'updatedAt'})
    updatedAt;

    static of(params: Partial<Movie>): Movie {
        const movie = new Movie();
        Object.assign(movie, params);

        return movie;
    }
}
