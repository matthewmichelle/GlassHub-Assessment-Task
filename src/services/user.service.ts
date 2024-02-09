// src/services/user.service.ts
import { injectable } from "inversify";
import { User } from "../data/models/user.entity";
import { UserRepository } from "../repositories/user.repository";

@injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async saveUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }
}
