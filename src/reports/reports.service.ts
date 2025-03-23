import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from '../transactions/transaction.schema';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async getMonthlyReport(spaceId: string, month: number, year: number) {}

  async getCategoryReport(spaceId: string, startDate: Date, endDate: Date) {}

  async getBudgetComparison(spaceId: string, month: number, year: number) {}
}
