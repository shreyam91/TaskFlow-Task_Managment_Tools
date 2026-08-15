import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { CompanyProfileService } from './company-profile.service';
import { UpdateCompanyDto } from '../../platform/dto/company.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { TenantGuard } from '../../../common/guards/tenant.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';

@UseGuards(JwtAuthGuard, RolesGuard, TenantGuard)
@Roles('COMPANY_ADMIN')
@Controller('admin/companies/:companyId/profile')
export class CompanyProfileController {
  constructor(private readonly companyProfileService: CompanyProfileService) {}

  @Get()
  getProfile(@Param('companyId') companyId: string) {
    return this.companyProfileService.getProfile(companyId);
  }

  @Patch()
  updateProfile(
    @Param('companyId') companyId: string,
    @Body() dto: UpdateCompanyDto,
    @CurrentUser() user: any
  ) {
    return this.companyProfileService.updateProfile(companyId, dto, user.id);
  }
}
