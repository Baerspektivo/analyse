import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class CurrentResultInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const { displayName, url } = request.body;

    if (!displayName || !url) {
      console.log('Name', displayName, 'URL', url, 'HOLE:', request.body);
      throw new HttpException('Please enter propertys', HttpStatus.BAD_REQUEST);
    }

    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}
