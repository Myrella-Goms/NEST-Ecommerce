import { HttpException, HttpStatus } from '@nestjs/common';

export interface DatabaseErrorDetails {
  errorCode?: string;
  field?: string;
  constraint?: string;
  [key: string]: any;
}

export class DatabaseErrorException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    public readonly errorCode?: string,
    public readonly details?: DatabaseErrorDetails,
  ) {
    super(
      {
        statusCode,
        message,
        error: HttpStatus[statusCode],
        errorCode,
        details,
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }
}
