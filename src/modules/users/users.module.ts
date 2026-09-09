import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repositories/user-repository';
import { UserEntity } from './entities/user.entity';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UsersController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    UserService,
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
  ],
  exports: ['IUserRepository', CreateUserUseCase],
})
export class UsersModule {}
