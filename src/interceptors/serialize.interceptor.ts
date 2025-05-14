import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { map } from 'rxjs';

@Injectable()
export class Serialize implements NestInterceptor {
  constructor(private dto: ClassConstructor<any>) {}
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      map((res) => {
        return plainToClass(this.dto, res, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
