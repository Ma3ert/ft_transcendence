import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { tap } from 'rxjs';

@Injectable()
export class GetSessionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      tap(() => {
        const response: Response = context.switchToHttp().getResponse();
        // response.cookie("Connect", "Something", {
        //     httpOnly: true,
        //     maxAge: 60000 * 10
        // })
        // console.groupCollapsed("Response:", response);
      }),
    );
  }
}
