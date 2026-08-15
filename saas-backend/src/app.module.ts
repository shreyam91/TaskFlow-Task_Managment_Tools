import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlatformModule } from './modules/platform/platform.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuditModule } from './core/audit/audit.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PlatformModule, AdminModule, AuditModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
