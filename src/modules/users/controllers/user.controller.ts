import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { CreateUserResponseDto } from '../dtos/create-user-response.dto';
import { UserService } from '../services/user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: CreateUserResponseDto,
    example: {
      id: '902a65a4-78d0-4d8c-99cf-eab746db9855',
    },
  })
  @ApiResponse({
    status: 409,
    description: 'User already exists (duplicate email, document or phone)',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @Post('create')
  async createUser(@Body() user: CreateUserDto): Promise<CreateUserResponseDto> {
    return await this.userService.createUser(user);
  }
}
