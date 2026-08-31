import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { QueryFailedError } from 'typeorm';
import { DuplicateUserException } from '../duplicate-user.exception';
import { DatabaseErrorException } from '../database-error.exception';

interface PostgresError extends Error {
  code?: string;
  detail?: string;
  constraint?: string;
  table?: string;
  column?: string;
}

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DatabaseExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const error = exception as unknown as PostgresError;

    // Log full technical error for debugging
    this.logger.error(
      `Database error: ${error.message}`,
      error.stack,
      JSON.stringify({
        code: error.code,
        detail: error.detail,
        constraint: error.constraint,
        table: error.table,
        path: request.url,
      }),
    );

    let transformedException: DatabaseErrorException;

    // PostgreSQL error codes
    switch (error.code) {
      case '23505': // unique_violation
        transformedException = this.handleUniqueViolation(error);
        break;

      case '23503': // foreign_key_violation
        transformedException = new DatabaseErrorException(
          'Referência inválida',
          HttpStatus.BAD_REQUEST,
          'FOREIGN_KEY_VIOLATION',
          {
            constraint: error.constraint,
            detail: error.detail,
          },
        );
        break;

      case '23502': // not_null_violation
        transformedException = new DatabaseErrorException(
          'Campo obrigatório não informado',
          HttpStatus.BAD_REQUEST,
          'NOT_NULL_VIOLATION',
          {
            column: error.column,
          },
        );
        break;

      case '23514':
        transformedException = new DatabaseErrorException(
          'Valor inválido para o campo',
          HttpStatus.BAD_REQUEST,
          'CHECK_CONSTRAINT_VIOLATION',
          {
            constraint: error.constraint,
          },
        );
        break;

      default:
        // Generic database error
        transformedException = new DatabaseErrorException(
          'Erro ao processar a operação no banco de dados',
          HttpStatus.INTERNAL_SERVER_ERROR,
          'DATABASE_ERROR',
        );
    }

    const exceptionResponse = transformedException.getResponse();
    const responseBody =
      typeof exceptionResponse === 'object'
        ? exceptionResponse
        : { message: exceptionResponse };

    response.status(transformedException.getStatus()).json({
      ...(responseBody as Record<string, unknown>),
      path: request.url,
    });
  }

  private handleUniqueViolation(error: PostgresError): DatabaseErrorException {
    const constraint = error.constraint || '';
    const detail = error.detail || '';

    let field = '';

    if (constraint.includes('email')) {
      field = 'email';
    } else if (constraint.includes('document')) {
      field = 'document';
    } else if (constraint.includes('phoneNumber')) {
      field = 'phoneNumber';
    } else if (detail) {
      const regex = /Key \((\w+)\)=/;
      const match = regex.exec(detail);
      if (match) {
        field = match[1];
      }
    }

    return new DuplicateUserException(field || 'unknown');
  }
}
