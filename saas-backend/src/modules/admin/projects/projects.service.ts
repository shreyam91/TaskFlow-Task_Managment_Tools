import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { AuditService } from '../../../core/audit/audit.service';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async create(dto: CreateProjectDto, adminId: string, companyId: string) {
    const project = await this.prisma.project.create({
      data: {
        ...dto,
        companyId,
      },
    });

    await this.auditService.logAction({
      userId: adminId,
      companyId,
      action: 'PROJECT_CREATE',
      resource: `Project:${project.id}`,
    });

    return project;
  }

  async findAll(companyId: string) {
    return this.prisma.project.findMany({
      where: { companyId, deletedAt: null },
      include: { tasks: true }
    });
  }

  async update(id: string, dto: UpdateProjectDto, adminId: string, companyId: string) {
    const project = await this.prisma.project.update({
      where: { id, companyId },
      data: dto,
    });

    await this.auditService.logAction({
      userId: adminId,
      companyId,
      action: 'PROJECT_UPDATE',
      resource: `Project:${id}`,
    });

    return project;
  }

  async remove(id: string, adminId: string, companyId: string) {
    await this.prisma.project.update({ 
      where: { id, companyId },
      data: { deletedAt: new Date() }
    });
    
    await this.auditService.logAction({
      userId: adminId,
      companyId,
      action: 'PROJECT_DELETE',
      resource: `Project:${id}`,
    });

    return { success: true };
  }
}
