import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema({ timestamps: true })
export class Transaction {
  @Prop({ required: true, min: 0 })
  amount: number;

  @Prop({ required: true, enum: ['income', 'expense'] })
  type: 'income' | 'expense';

  @Prop({ required: true })
  category: string;

  @Prop({
    required: true,
    enum: ['credit card', 'debit card', 'cash', 'transfer'],
  })
  method: 'credit card' | 'debit card' | 'cash' | 'transfer';

  @Prop({ default: false })
  installments: boolean;

  @Prop({ default: null, min: 1 })
  installmentCount?: number;

  @Prop({ default: null, min: 1 })
  currentInstallment?: number;

  @Prop({ type: MongooseSchema.Types.ObjectId })
  installmentGroupId?: string;

  @Prop({ required: true })
  description?: string;

  @Prop({ default: new Date() })
  date: Date;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createdBy: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'Space' })
  spaceId: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  sharedWith: string[];

  @Prop({ default: 'pending', enum: ['pending', 'completed', 'cancelled'] })
  status: 'pending' | 'completed' | 'cancelled';
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
