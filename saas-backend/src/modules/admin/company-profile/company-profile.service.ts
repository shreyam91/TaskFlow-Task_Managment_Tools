import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { AuditService } from '../../../core/audit/audit.service';
import { UpdateCompanyDto } from '../../platform/dto/company.dto';

@Injectable()
export class CompanyProfileService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async getProfile(companyId: string) {
    const company = await this.prisma.company.findUnique({
      where: { id: companyId },
      include: {
        subscriptions: {
          include: { plan: true }
        }
      }
    });

    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async updateProfile(companyId: string, dto: UpdateCompanyDto, adminId: string) {
    // Only allow specific fields to be updated by COMPANY_ADMIN
    const allowedUpdates = {
      name: dto.name,
      domain: dto.domain,
      settings: dto.settings,
    };

    const company = await this.prisma.company.update({
      where: { id: companyId },
      data: allowedUpdates,
    });

    await this.auditService.logAction({
      userId: adminId,
      companyId,
      action: 'COMPANY_PROFILE_UPDATE',
      resource: `Company:${companyId}`,
    });

    return company;
  }
}
