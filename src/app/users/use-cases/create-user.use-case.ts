import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../interfaces/user-repository.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import * as argon2 from 'argon2';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const hashPassword = await argon2.hash(userDto.password);
    const user = {
      ...userDto,
      password: hashPassword,
    };
    const userCreate = await this.userRepository.createUser(user);
    return userCreate;
  }
}
