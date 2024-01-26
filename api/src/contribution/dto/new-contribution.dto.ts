import {
  IsString,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class NewContributionDto {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsNotEmpty()
  @IsString()
  memberId: string;
}
