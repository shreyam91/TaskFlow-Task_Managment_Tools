import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../core/prisma/prisma.service';
import { AuditService } from '../../core/audit/audit.service';
import { LoginDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private auditService: AuditService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Check super admin first
    let user: any = await this.prisma.superAdmin.findUnique({ where: { email } });
    let role = 'SUPER_ADMIN';

    if (!user) {
      // Check regular users
      user = await this.prisma.user.findUnique({ where: { email } });
      if (user) {
        role = user.role;
      }
    }

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      sub: user.id, 
      email: user.email, 
      role, 
      companyId: user.companyId || null 
    };

    const accessToken = this.jwtService.sign(payload);

    await this.auditService.logAction({
      userId: user.id,
      companyId: user.companyId,
      action: 'USER_LOGIN',
      resource: 'Authentication',
    });

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role,
        companyId: user.companyId,
      }
    };
  }

  async logout(userId: string) {
    await this.auditService.logAction({
      userId,
      action: 'USER_LOGOUT',
      resource: 'Authentication',
    });
    return { success: true };
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    // In a real app, generate a token, save to DB, and send an email
    return { message: 'If an account exists, a reset email has been sent.' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    // In a real app, verify the token and update the user's passwordHash
    return { message: 'Password has been successfully reset.' };
  }
}
