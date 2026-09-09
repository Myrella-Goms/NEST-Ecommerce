import { Global, Module } from '@nestjs/common';
import { Argon2Adapter } from './argon2.adapter';

@Global()
@Module({
  exports: ['Argon2Port'],
  providers: [{ provide: 'Argon2Port', useClass: Argon2Adapter }],
})
export class Argon2Module {}
