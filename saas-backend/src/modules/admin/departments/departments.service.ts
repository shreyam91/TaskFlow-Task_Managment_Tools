import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { AuditService } from '../../../core/audit/audit.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dto/department.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async create(dto: CreateDepartmentDto, adminId: string, companyId: string) {
    const department = await this.prisma.department.create({
      data: {
        ...dto,
        companyId,
      },
    });

    await this.auditService.logAction({
      userId: adminId,
      companyId,
      action: 'DEPARTMENT_CREATE',
      resource: `Department:${department.id}`,
    });

    return department;
  }

  async findAll(companyId: string) {
    return this.prisma.department.findMany({ where: { companyId } });
  }

  async update(id: string, dto: UpdateDepartmentDto, adminId: string, companyId: string) {
    const department = await this.prisma.department.update({
      where: { id, companyId },
      data: dto,
    });

    await this.auditService.logAction({
      userId: adminId,
      companyId,
      action: 'DEPARTMENT_UPDATE',
      resource: `Department:${id}`,
    });

    return department;
  }

  async remove(id: string, adminId: string, companyId: string) {
    await this.prisma.department.delete({ where: { id, companyId } });
    
    await this.auditService.logAction({
      userId: adminId,
      companyId,
      action: 'DEPARTMENT_DELETE',
      resource: `Department:${id}`,
    });

    return { success: true };
  }
}
