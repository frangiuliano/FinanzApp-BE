import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class Budget {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  period: 'monthly' | 'yearly';

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Category' })
  categoryId: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Space' })
  spaceId: string;

  @Prop()
  startDate: Date;

  @Prop()
  endDate?: Date;
}

export const BudgetSchema = SchemaFactory.createForClass(Budget);
