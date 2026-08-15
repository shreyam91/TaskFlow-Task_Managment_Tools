import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from '../dto/employee.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('COMPANY_ADMIN')
@Controller('admin/companies/:companyId/employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  create(
    @Param('companyId') companyId: string,
    @Body() dto: CreateEmployeeDto,
    @CurrentUser() user: any
  ) {
    return this.employeesService.create(dto, user.id, companyId);
  }

  @Get()
  findAll(@Param('companyId') companyId: string) {
    return this.employeesService.findAll(companyId);
  }

  @Patch(':id')
  update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeDto,
    @CurrentUser() user: any
  ) {
    return this.employeesService.update(id, dto, user.id, companyId);
  }

  @Delete(':id')
  remove(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @CurrentUser() user: any
  ) {
    return this.employeesService.remove(id, user.id, companyId);
  }
}
