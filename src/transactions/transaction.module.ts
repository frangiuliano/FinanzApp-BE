import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction, TransactionSchema } from './transaction.schema';
// import { TelegramBotService } from './telegram-bot.service';
import { SpaceModule } from '../spaces/space.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    SpaceModule,
    CategoriesModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService /*, TelegramBotService*/],
})
export class TransactionModule {}
