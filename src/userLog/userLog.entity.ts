import {Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Movie} from "../movie/movie.entity";

@Entity()
export class UserLogEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'user_id'})
    userId: number;

    /*@ManyToOne(() => User, (User) => User.userLogs, { cascade: true })
    user: User;
    */
    @ManyToOne(() => Movie, (Movie) => Movie.userLogs, { cascade: true })
    @JoinColumn({ name: "movie_id" })
    movie: Movie;

    @CreateDateColumn({name: 'created_at'})
    createdAt;

    static of(params: Partial<UserLogEntity>): UserLogEntity {
        const userLogEntity = new UserLogEntity();
        Object.assign(userLogEntity, params);

        return userLogEntity;
    }
}
