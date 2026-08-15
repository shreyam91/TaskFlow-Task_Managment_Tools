import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuditService {
  constructor(private prisma: PrismaService) {}

  async logAction(params: {
    companyId?: string;
    userId?: string;
    action: string;
    resource: string;
    details?: any;
  }) {
    return this.prisma.auditLog.create({
      data: {
        companyId: params.companyId,
        userId: params.userId,
        action: params.action,
        resource: params.resource,
        details: params.details || {},
      },
    });
  }
}
