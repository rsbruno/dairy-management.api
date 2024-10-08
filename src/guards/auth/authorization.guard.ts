import { AuthConfigsService } from '@/configs/auth-configs/auth-configs.service';
import { ROLES_DECORATOR_KEY } from '@/decorators/roles/roles.decorator';
import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { Reflector } from '@nestjs/core';
import {
  UnauthorizedException,
  ForbiddenException,
  ExecutionContext,
  CanActivate,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authConfigsService: AuthConfigsService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_DECORATOR_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
      console.log(requiredRoles);
      if (!requiredRoles?.length) return true;
      else {
        const roles = this.authConfigsService.getUser().roles;
        if (!roles.length) throw new UnauthorizedException(commonExceptions.http.unauthorized);
        const userRoles = roles.map((r) => r.name);
        const rolesNotFound = requiredRoles.filter((role) => !userRoles.includes(role));
        if (rolesNotFound.length) throw new ForbiddenException({ roles: rolesNotFound });
        return true;
      }
    } catch (error) {
      throw error;
    }
  }
}
