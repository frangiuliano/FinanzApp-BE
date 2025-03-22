import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Transaction } from './transaction.schema';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const baseTransaction = {
      ...createTransactionDto,
      spaceId: new Types.ObjectId(createTransactionDto.spaceId),
      createdBy: new Types.ObjectId(createTransactionDto.createdBy),
    };

    if (
      !createTransactionDto.installments ||
      !createTransactionDto.installmentCount
    ) {
      const transaction = new this.transactionModel(baseTransaction);
      return transaction.save();
    }

    const installmentGroupId = new Types.ObjectId();
    const installmentAmount =
      createTransactionDto.amount / createTransactionDto.installmentCount;
    const baseDate = createTransactionDto.date
      ? new Date(createTransactionDto.date)
      : new Date();

    const installments = Array.from(
      { length: createTransactionDto.installmentCount },
      (_, index) => {
        const installmentDate = new Date(baseDate);
        installmentDate.setMonth(baseDate.getMonth() + index);

        return {
          ...baseTransaction,
          amount: installmentAmount,
          date: installmentDate,
          currentInstallment: index + 1,
          installmentGroupId,
        };
      },
    );

    return this.transactionModel.insertMany(installments);
  }

  async findAll(spaceId: string) {
    return this.transactionModel.find({ spaceId }).exec();
  }

  async findOne(id: string) {
    return this.transactionModel.findById(id).exec();
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    return this.transactionModel
      .findByIdAndUpdate(id, updateTransactionDto, { new: true })
      .exec();
  }

  async remove(id: string) {
    return this.transactionModel.findByIdAndDelete(id).exec();
  }
}
