import { HttpStatus } from '@nestjs/common';
import { DatabaseErrorException } from './database-error.exception';

export class DuplicateUserException extends DatabaseErrorException {
  constructor(field: string, value?: string) {
    const fieldMessages: Record<string, string> = {
      email: 'Email já cadastrado',
      document: 'Documento já cadastrado',
      phoneNumber: 'Telefone já cadastrado',
    };

    const errorCodes: Record<string, string> = {
      email: 'DUPLICATE_EMAIL',
      document: 'DUPLICATE_DOCUMENT',
      phoneNumber: 'DUPLICATE_PHONE_NUMBER',
      phone_number: 'DUPLICATE_PHONE_NUMBER',
    };

    const message = fieldMessages[field] || 'Dados duplicados';
    const errorCode = errorCodes[field] || 'DUPLICATE_DATA';

    super(message, HttpStatus.CONFLICT, errorCode, {
      field,
      value: value ? '***' : undefined, // Hide actual value for security
    });
  }
}
