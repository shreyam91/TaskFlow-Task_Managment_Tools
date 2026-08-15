import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { AuditService } from '../../../core/audit/audit.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';

@Injectable()
export class TasksService {
  constructor(
    private prisma: PrismaService,
    private auditService: AuditService,
  ) {}

  async create(dto: CreateTaskDto, adminId: string, companyId: string) {
    const task = await this.prisma.task.create({
      data: {
        ...dto,
        companyId,
      },
    });

    await this.auditService.logAction({
      userId: adminId,
      companyId,
      action: 'TASK_CREATE',
      resource: `Task:${task.id}`,
    });

    return task;
  }

  async findAll(companyId: string) {
    return this.prisma.task.findMany({
      where: { companyId, deletedAt: null },
      include: { project: true, assignee: { select: { id: true, email: true } } }
    });
  }

  async update(id: string, dto: UpdateTaskDto, adminId: string, companyId: string) {
    const task = await this.prisma.task.update({
      where: { id, companyId },
      data: dto,
    });

    await this.auditService.logAction({
      userId: adminId,
      companyId,
      action: 'TASK_UPDATE',
      resource: `Task:${id}`,
    });

    return task;
  }

  async remove(id: string, adminId: string, companyId: string) {
    await this.prisma.task.update({ 
      where: { id, companyId },
      data: { deletedAt: new Date() }
    });
    
    await this.auditService.logAction({
      userId: adminId,
      companyId,
      action: 'TASK_DELETE',
      resource: `Task:${id}`,
    });

    return { success: true };
  }
}
