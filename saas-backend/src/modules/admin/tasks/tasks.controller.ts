import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '../dto/task.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('COMPANY_ADMIN', 'EMPLOYEE')
@Controller('admin/companies/:companyId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(
    @Param('companyId') companyId: string,
    @Body() dto: CreateTaskDto,
    @CurrentUser() user: any
  ) {
    return this.tasksService.create(dto, user.id, companyId);
  }

  @Get()
  findAll(@Param('companyId') companyId: string) {
    return this.tasksService.findAll(companyId);
  }

  @Patch(':id')
  update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @CurrentUser() user: any
  ) {
    return this.tasksService.update(id, dto, user.id, companyId);
  }

  @Delete(':id')
  remove(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @CurrentUser() user: any
  ) {
    return this.tasksService.remove(id, user.id, companyId);
  }
}
