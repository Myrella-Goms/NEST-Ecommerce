import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { CreateUserResponseDto } from '../dtos/create-user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  async createUser(userDto: CreateUserDto): Promise<CreateUserResponseDto> {
    const user = await this.createUserUseCase.createUser(userDto);
    return {
      id: user.id,
    };
  }
}
