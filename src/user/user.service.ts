import { Injectable } from '@nestjs/common';
import {UserDto} from "../user/user.dto";
import {UserRepository} from "../user/user.repository";
import {User} from "../user/user.entity";
import {Movie} from "../movie/movie.entity";

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {
    }

    async createUser(userDto: UserDto): Promise<User> {
        try {
            const user = this.userRepository.create(User.of(userDto));
            return this.userRepository.create(user);
        } catch (e) {
            console.log(e);
        }

    }

    async findUserByUserId(userId: number): Promise<User> {
        return  await this.userRepository.findOne({
            userId,
        })
    }

}
