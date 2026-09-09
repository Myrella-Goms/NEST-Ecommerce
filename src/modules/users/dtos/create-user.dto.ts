import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ required: true, description: 'Users first name' })
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @ApiProperty({ required: true, description: 'Users last name' })
  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @ApiProperty({ required: true, description: 'Users email' })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({ required: true, description: 'Users document' })
  @IsNumber()
  @IsNotEmpty()
  document!: string;

  @ApiProperty({ required: true, description: 'Users phoneNumber' })
  @IsString()
  @IsNotEmpty()
  phoneNumber!: string;

  @ApiProperty({ required: true, description: 'Users password' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
