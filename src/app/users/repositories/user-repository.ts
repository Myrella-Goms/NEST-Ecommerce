import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from '../interfaces/user-repository.interface';
import { Repository } from 'typeorm';

export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: CreateUserDto): Promise<UserEntity> {
    const userEntity = this.userRepository.create(user);
    return await this.userRepository.save(userEntity);
  }
}
