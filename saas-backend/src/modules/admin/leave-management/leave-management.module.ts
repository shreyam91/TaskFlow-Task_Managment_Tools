import { Module } from '@nestjs/common';
import { LeaveManagementController } from './leave-management.controller';
import { LeaveManagementService } from './leave-management.service';

@Module({
  controllers: [LeaveManagementController],
  providers: [LeaveManagementService]
})
export class LeaveManagementModule {}
