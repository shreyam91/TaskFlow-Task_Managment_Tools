import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { AuditService } from '../../../core/audit/audit.service';
import { CreateCompanyDto, UpdateCompanyDto } from '../dto/company.dto';
import { CompanyStatus } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async findAll() {
    return this.prisma.company.findMany();
  }

  async findOne(id: string) {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) throw new NotFoundException('Company not found');
    return company;
  }

  async create(dto: CreateCompanyDto, adminId: string) {
    const company = await this.prisma.company.create({
      data: dto,
    });
    
    await this.auditService.logAction({
      userId: adminId,
      action: 'COMPANY_CREATE',
      resource: `Company:${company.id}`,
    });

    return company;
  }

  async update(id: string, dto: UpdateCompanyDto, adminId: string) {
    const company = await this.prisma.company.update({
      where: { id },
      data: dto,
    });

    await this.auditService.logAction({
      userId: adminId,
      companyId: id,
      action: 'COMPANY_UPDATE',
      resource: `Company:${company.id}`,
      details: Object.keys(dto),
    });

    return company;
  }

  async delete(id: string, adminId: string) {
    await this.prisma.company.delete({ where: { id } });
    
    await this.auditService.logAction({
      userId: adminId,
      action: 'COMPANY_DELETE',
      resource: `Company:${id}`,
    });

    return { success: true };
  }

  async suspend(id: string, adminId: string) {
    return this.update(id, { status: CompanyStatus.SUSPENDED }, adminId);
  }
}
