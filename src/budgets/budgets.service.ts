import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Budget } from './budget.schema';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Injectable()
export class BudgetsService {
  constructor(@InjectModel(Budget.name) private budgetModel: Model<Budget>) {}

  async create(createBudgetDto: CreateBudgetDto) {
    const budget = new this.budgetModel(createBudgetDto);
    return budget.save();
  }

  async findBySpace(spaceId: string) {
    return this.budgetModel.find({ spaceId }).populate('categoryId').exec();
  }

  async findActive(spaceId: string) {
    const now = new Date();
    return this.budgetModel
      .find({
        spaceId,
        startDate: { $lte: now },
        $or: [{ endDate: { $gte: now } }, { endDate: null }],
      })
      .populate('categoryId')
      .exec();
  }

  async getBudgetProgress(budgetId: string) {}
}
