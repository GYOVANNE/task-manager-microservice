import { Response } from 'express';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException as HttpExceptions,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';

import { createScopedLogger } from '@config/logs';
import { AppError } from './app-errors';

interface IErrorResponse {
  message: string[];
  statusCode: number;
  error: string;
}
const log = createScopedLogger('Global error');

@Catch(Error)
export class GlobalErrors implements ExceptionFilter<Error> {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let message: any;
    let statusCode: number;

    if (exception instanceof NotFoundException) {
      message = {};
      statusCode = HttpStatus.NO_CONTENT;
    } else if (exception instanceof AppError) {
      const response = exception.getResponse();

      message = response.message;
      statusCode = response.statusCode;
    } else if (exception instanceof HttpExceptions) {
      const response = exception.getResponse() as IErrorResponse;
      message = response.message;
      statusCode = response.statusCode;
      if (!statusCode && exception.name == 'ThrottlerException') {
        message = 'too_many_requests';
        statusCode = HttpStatus.TOO_MANY_REQUESTS;
      }
    } else {
      message = 'internal_server_error';
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      log.error('Error', { statusCode, message, stack: exception.stack });
    }

    return response.status(statusCode).json({
      response: message,
    });
  }
}
