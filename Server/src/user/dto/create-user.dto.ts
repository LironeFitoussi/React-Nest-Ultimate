/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  zip?: string;

  @IsEnum(['admin', 'user'])
  @IsOptional()
  role?: string = 'user';

  @IsString()
  @IsOptional()
  auth0Id?: string;
}
