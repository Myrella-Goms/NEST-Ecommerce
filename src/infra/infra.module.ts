import { Module } from '@nestjs/common';
import { Argon2Adapter } from './adapters/argon2/argon2.adapter';

@Module({
  imports: [Argon2Adapter],
  providers: [],
  exports: [],
})
export class InfraModule {}
