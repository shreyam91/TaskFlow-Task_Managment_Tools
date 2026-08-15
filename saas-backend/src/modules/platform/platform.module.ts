import { Module } from '@nestjs/common';
import { CompaniesController } from './companies/companies.controller';
import { CompaniesService } from './companies/companies.service';
import { SubscriptionsController } from './subscriptions/subscriptions.controller';
import { SubscriptionsService } from './subscriptions/subscriptions.service';

@Module({
  controllers: [CompaniesController, SubscriptionsController],
  providers: [CompaniesService, SubscriptionsService]
})
export class PlatformModule {}
