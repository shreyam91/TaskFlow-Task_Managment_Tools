import { Controller, Get, Post, Body, UseGuards, Param } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreatePlanDto } from '../dto/subscription.dto';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
@Controller('platform/subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('plans')
  createPlan(@Body() dto: CreatePlanDto) {
    return this.subscriptionsService.createPlan(dto);
  }

  @Get('plans')
  getPlans() {
    return this.subscriptionsService.getPlans();
  }

  @Post('assign/:companyId/:planId')
  assignPlan(
    @Param('companyId') companyId: string,
    @Param('planId') planId: string,
  ) {
    return this.subscriptionsService.assignPlanToCompany(companyId, planId);
  }
}
