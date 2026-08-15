import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

/**
 * Ensures that a COMPANY_ADMIN or EMPLOYEE can only access resources
 * that belong to their company. For SUPER_ADMIN, it bypasses.
 */
@Injectable()
export class TenantGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    
    if (!user) {
      return false;
    }

    // Super Admin has global access
    if (user.role === 'SUPER_ADMIN') {
      return true;
    }

    // If the route involves a companyId param, ensure it matches
    const params = request.params;
    if (params.companyId && params.companyId !== user.companyId) {
      throw new ForbiddenException('Tenant boundary violation');
    }
    
    // As long as the user has a companyId, Prisma extension will handle
    // row-level isolation automatically.
    return !!user.companyId;
  }
}
