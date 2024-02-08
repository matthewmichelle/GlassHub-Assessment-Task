import { EntityRepository, Repository } from 'typeorm';
import { User } from '../data/models/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    // custom repository methods...
}