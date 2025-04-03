import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { UnauthorizedException, CanActivate, Injectable } from '@nestjs/common';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly authConfigsService: AuthConfigsService) {
    super();
  }
  async canActivate(): Promise<boolean> {
    const userLogged = await this.authConfigsService._loadInfoUserLogged();
    if (!userLogged) throw new UnauthorizedException(commonExceptions.http.unauthorized);
    return true;
  }
}
