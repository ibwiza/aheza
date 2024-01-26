import { IsNotEmpty, IsEmail } from 'class-validator';

export class ResetDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
