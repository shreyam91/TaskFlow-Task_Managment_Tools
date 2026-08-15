import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto, UpdateDepartmentDto } from '../dto/department.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('COMPANY_ADMIN')
@Controller('admin/companies/:companyId/departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(
    @Param('companyId') companyId: string,
    @Body() dto: CreateDepartmentDto,
    @CurrentUser() user: any
  ) {
    return this.departmentsService.create(dto, user.id, companyId);
  }

  @Get()
  findAll(@Param('companyId') companyId: string) {
    return this.departmentsService.findAll(companyId);
  }

  @Patch(':id')
  update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() dto: UpdateDepartmentDto,
    @CurrentUser() user: any
  ) {
    return this.departmentsService.update(id, dto, user.id, companyId);
  }

  @Delete(':id')
  remove(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @CurrentUser() user: any
  ) {
    return this.departmentsService.remove(id, user.id, companyId);
  }
}
