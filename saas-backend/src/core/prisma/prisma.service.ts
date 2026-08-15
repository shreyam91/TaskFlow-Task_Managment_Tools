import { Injectable, OnModuleInit, OnModuleDestroy, Scope, Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(@Inject(REQUEST) private readonly request: Request) {
    super();
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  /**
   * Returns a Prisma Client extended with row-level multi-tenancy.
   * It automatically injects the `companyId` from the current request's JWT payload
   * into every query that queries tenant-specific tables.
   */
  get tenantClient() {
    // Assuming the JwtAuthGuard/TenantGuard sets `user` on the request
    const user = (this.request as any).user;
    
    if (!user || !user.companyId) {
      throw new Error("Cannot access tenant database without a valid company context.");
    }

    const companyId = user.companyId;

    return this.$extends({
      query: {
        $allModels: {
          async $allOperations({ model, operation, args, query }) {
            // Models that belong to a specific tenant and should be isolated
            const tenantModels = ['User', 'Department', 'Subscription', 'Project', 'Task', 'Attendance', 'LeaveRequest', 'PerformanceReview', 'Notification'];
            
            if (tenantModels.includes(model)) {
              // Inject companyId into the where clause
              args.where = { ...args.where, companyId };
            }

            return query(args);
          },
        },
      },
    });
  }
}
