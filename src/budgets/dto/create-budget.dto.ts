import { IsNotEmpty, IsNumber, IsEnum, IsDateString } from 'class-validator';

export class CreateBudgetDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  amount: number;

  @IsEnum(['monthly', 'yearly'])
  period: 'monthly' | 'yearly';

  @IsNotEmpty()
  categoryId: string;

  @IsNotEmpty()
  spaceId: string;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate?: Date;
}
