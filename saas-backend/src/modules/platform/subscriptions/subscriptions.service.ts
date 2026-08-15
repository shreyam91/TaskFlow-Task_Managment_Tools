import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../core/prisma/prisma.service';
import { CreatePlanDto } from '../dto/subscription.dto';

@Injectable()
export class SubscriptionsService {
  constructor(private prisma: PrismaService) {}

  async createPlan(dto: CreatePlanDto) {
    return this.prisma.subscriptionPlan.create({
      data: dto,
    });
  }

  async getPlans() {
    return this.prisma.subscriptionPlan.findMany();
  }

  async assignPlanToCompany(companyId: string, planId: string) {
    return this.prisma.subscription.upsert({
      where: { companyId },
      update: { planId },
      create: { companyId, planId },
    });
  }
}
