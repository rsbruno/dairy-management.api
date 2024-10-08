import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly authConfigsService: AuthConfigsService) {
    super();
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userLogged = await this.authConfigsService._loadInfoUserLogged();
    if (!userLogged) throw new UnauthorizedException(commonExceptions.http.unauthorized);
    return true;
  }
}
