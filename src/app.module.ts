import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from './transactions/transaction.module';
import { UsersModule } from './users/users.module';
import { SpaceModule } from './spaces/space.module';
import { BudgetsModule } from './budgets/budgets.module';
import { AuthModule } from './auth/auth.module';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        console.log('MongoDB URI:', uri);
        return {
          uri,
          retryWrites: true,
          w: 'majority',
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    TransactionModule,
    UsersModule,
    SpaceModule,
    BudgetsModule,
    CardsModule,
  ],
})
export class AppModule {}
