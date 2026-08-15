import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { AuditService } from '../../../core/audit/audit.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/employee.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EmployeesService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async create(dto: CreateEmployeeDto, adminId: string, companyId: string) {
    const passwordHash = await bcrypt.hash(dto.password, 10);
    
    const employee = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        role: dto.role || 'EMPLOYEE',
        departmentId: dto.departmentId,
        companyId,
      },
    });

    await this.auditService.logAction({
      userId: adminId,
      companyId,
      action: 'EMPLOYEE_CREATE',
      resource: `User:${employee.id}`,
    });

    const { passwordHash: _, ...result } = employee;
    return result;
  }

  async findAll(companyId: string) {
    return this.prisma.user.findMany({
      where: { companyId },
      select: { id: true, email: true, role: true, departmentId: true, createdAt: true },
    });
  }

  async update(id: string, dto: UpdateEmployeeDto, adminId: string, companyId: string) {
    const employee = await this.prisma.user.update({
      where: { id, companyId },
      data: dto,
    });

    await this.auditService.logAction({
      userId: adminId,
      companyId,
      action: 'EMPLOYEE_UPDATE',
      resource: `User:${id}`,
    });

    const { passwordHash: _, ...result } = employee;
    return result;
  }

  async remove(id: string, adminId: string, companyId: string) {
    await this.prisma.user.delete({ where: { id, companyId } });
    
    await this.auditService.logAction({
      userId: adminId,
      companyId,
      action: 'EMPLOYEE_DELETE',
      resource: `User:${id}`,
    });

    return { success: true };
  }
}
