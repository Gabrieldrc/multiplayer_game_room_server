import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import ResponseTemplate from '@common/class/ResponseTemplate';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const responseObject = new ResponseTemplate()
      .setEntry(request.query)
      .setError(exception);

    response.status(status).json(responseObject.getResponseObj());
  }
}
