import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto, UpdateProjectDto } from '../dto/project.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('COMPANY_ADMIN', 'EMPLOYEE') // Depending on RBAC, employees might only read, but for now we'll allow access
@Controller('admin/companies/:companyId/projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  create(
    @Param('companyId') companyId: string,
    @Body() dto: CreateProjectDto,
    @CurrentUser() user: any
  ) {
    return this.projectsService.create(dto, user.id, companyId);
  }

  @Get()
  findAll(@Param('companyId') companyId: string) {
    return this.projectsService.findAll(companyId);
  }

  @Patch(':id')
  update(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @Body() dto: UpdateProjectDto,
    @CurrentUser() user: any
  ) {
    return this.projectsService.update(id, dto, user.id, companyId);
  }

  @Delete(':id')
  remove(
    @Param('companyId') companyId: string,
    @Param('id') id: string,
    @CurrentUser() user: any
  ) {
    return this.projectsService.remove(id, user.id, companyId);
  }
}
