import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Space, SpaceSchema } from './space.schema';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Space.name, schema: SpaceSchema }]),
  ],
  controllers: [SpaceController],
  providers: [SpaceService],
})
export class SpaceModule {}
