import { Module } from '@nestjs/common';
import { EmployeesController } from './employees/employees.controller';
import { EmployeesService } from './employees/employees.service';
import { DepartmentsController } from './departments/departments.controller';
import { DepartmentsService } from './departments/departments.service';
import { CompanyProfileController } from './company-profile/company-profile.controller';
import { CompanyProfileService } from './company-profile/company-profile.service';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { AttendanceModule } from './attendance/attendance.module';
import { LeaveManagementModule } from './leave-management/leave-management.module';
import { PerformanceModule } from './performance/performance.module';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  controllers: [EmployeesController, DepartmentsController, CompanyProfileController],
  providers: [EmployeesService, DepartmentsService, CompanyProfileService],
  imports: [ProjectsModule, TasksModule, AttendanceModule, LeaveManagementModule, PerformanceModule, NotificationsModule]
})
export class AdminModule {}
