// src/services/user.service.ts
import { injectable } from "inversify";
import { User } from "../data/models/user.entity";
import { UserRepository } from "../repositories/user.repository";

@injectable()
export class UserService {
    
    constructor(private readonly userRepository: UserRepository) { }

    async saveUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find();
        if (!users) {
            throw new Error(`Users ${users} not found`);
        }
        return users;
    }

     async findOneById(userId: number): Promise<User | undefined> {

        const user = await this.userRepository.findOneById(userId);
        if (!user) {
            throw new Error(`User with id ${userId} not found`);
        }
        return user;
    }

}
