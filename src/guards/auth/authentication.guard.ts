import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') implements CanActivate {
  constructor() {
    super();
  }
  canActivate(context: ExecutionContext): boolean {
    console.log('passei');
   /*  const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];
    if (!token) throw new UnauthorizedException(commonExceptions.http.unauthorized); */
    return true;
  }
}
