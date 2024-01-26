import {
    IsString,
    IsNotEmpty,
    IsNumber,
  } from 'class-validator';
  
  export class YearContributionDto {

  
    @IsNotEmpty()
    @IsNumber()
    year: number;
  
    @IsNotEmpty()
    @IsString()
    memberId: string;
  }
  