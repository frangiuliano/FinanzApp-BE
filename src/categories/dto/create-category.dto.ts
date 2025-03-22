import { IsNotEmpty, IsEnum, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty()
  name: string;

  @IsEnum(['income', 'expense'])
  type: 'income' | 'expense';

  @IsNotEmpty()
  spaceId: string;

  @IsOptional()
  icon?: string;

  @IsOptional()
  color?: string;
}
