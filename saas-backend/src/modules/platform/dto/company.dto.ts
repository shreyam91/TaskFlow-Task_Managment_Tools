import { IsString, IsOptional, IsEnum, IsObject } from 'class-validator';
import { CompanyStatus } from '@prisma/client';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  domain?: string;
}

export class UpdateCompanyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  domain?: string;

  @IsEnum(CompanyStatus)
  @IsOptional()
  status?: CompanyStatus;

  @IsObject()
  @IsOptional()
  settings?: any;
}
