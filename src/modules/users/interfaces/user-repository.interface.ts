import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  createUser(user: CreateUserDto): Promise<UserEntity>;
}
