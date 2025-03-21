import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Space } from './space.schema';

@Injectable()
export class SpaceService {
  constructor(@InjectModel(Space.name) private spaceModel: Model<Space>) {}

  async create(createSpaceDto: any) {
    const space = new this.spaceModel(createSpaceDto);
    return space.save();
  }

  async findUserSpaces(userId: string) {
    return this.spaceModel.find({
      $or: [{ owner: userId }, { members: userId }],
    });
  }

  async addMember(spaceId: string, userId: string) {
    return this.spaceModel.findByIdAndUpdate(
      spaceId,
      { $addToSet: { members: userId } },
      { new: true },
    );
  }
}
