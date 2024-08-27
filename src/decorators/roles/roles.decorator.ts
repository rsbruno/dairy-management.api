import { SetMetadata } from '@nestjs/common';

export const ROLES_DECORATOR_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_DECORATOR_KEY, roles);
