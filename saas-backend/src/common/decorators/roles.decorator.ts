import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const ROLES_KEY = 'roles';

// Super Admin role isn't in the Role enum since it's a separate model, 
// so we use a union type for our custom decorator
export type AppRole = Role | 'SUPER_ADMIN';

export const Roles = (...roles: AppRole[]) => SetMetadata(ROLES_KEY, roles);
