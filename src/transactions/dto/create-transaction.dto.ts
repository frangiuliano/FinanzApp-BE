import {
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateTransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsEnum(['income', 'expense'])
  type: 'income' | 'expense';

  @IsNotEmpty()
  category: string;

  @IsEnum(['credit card', 'debit card', 'cash', 'transfer'])
  method: 'credit card' | 'debit card' | 'cash' | 'transfer';

  @IsBoolean()
  @IsOptional()
  installments?: boolean;

  @IsNumber()
  @IsOptional()
  installmentCount?: number;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  spaceId: string;

  @IsNotEmpty()
  createdBy: string;

  @IsOptional()
  date?: Date;
}
