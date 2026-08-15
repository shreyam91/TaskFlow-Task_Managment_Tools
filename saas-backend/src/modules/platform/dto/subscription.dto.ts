import { IsString, IsNumber, IsObject } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  name: string;

  @IsNumber()
  maxEmployees: number;

  @IsObject()
  features: Record<string, boolean | number | string>;
}
