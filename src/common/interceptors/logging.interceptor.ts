import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import {Observable, tap} from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { statusCode } = context.switchToHttp().getResponse();
    const { originalUrl, method, params, query, body } = req;

    console.log({
      originalUrl,
      method,
      params,
      query,
      body,
    });

    return next.handle().pipe(
        tap((data) =>
            console.log({
              statusCode,
              data,
            })
        )
    );
  }
}
