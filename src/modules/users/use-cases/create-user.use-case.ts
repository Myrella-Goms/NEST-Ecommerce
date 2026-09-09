import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../interfaces/user-repository.interface';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import type { Argon2Port } from '../interfaces/argon2.port';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
    @Inject('Argon2Port')
    private readonly argon2Port: Argon2Port,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const hashPassword = await this.argon2Port.hash(userDto.password);
    const user = {
      ...userDto,
      password: hashPassword,
    };
    const userCreate = await this.userRepository.createUser(user);
    return userCreate;
  }
}
