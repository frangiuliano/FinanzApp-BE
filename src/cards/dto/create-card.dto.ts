import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  IsOptional,
} from 'class-validator';

export class CreateCardDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  bank: string;

  @IsNotEmpty()
  @IsString()
  @Length(4, 4)
  lastFourDigits: string;

  @IsNotEmpty()
  @IsNumber()
  expiryMonth: number;

  @IsNotEmpty()
  @IsNumber()
  expiryYear: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsOptional()
  @IsString()
  spaceId?: string;
}
