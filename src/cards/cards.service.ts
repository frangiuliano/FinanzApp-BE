import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card, CardDocument } from './schemas/card.schema';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  private readonly logger = new Logger(CardsService.name);

  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    this.logger.log(
      `Creando tarjeta con datos: ${JSON.stringify(createCardDto)}`,
    );
    const createdCard = new this.cardModel(createCardDto);
    return createdCard.save();
  }

  async findAll(): Promise<Card[]> {
    return this.cardModel.find().exec();
  }

  async findOne(id: string): Promise<Card> {
    const card = await this.cardModel.findById(id).exec();
    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return card;
  }

  async findByUser(userId: string): Promise<Card[]> {
    return this.cardModel.find({ userId }).exec();
  }

  async findBySpace(spaceId: string): Promise<Card[]> {
    return this.cardModel.find({ spaceId }).exec();
  }

  async remove(id: string): Promise<Card> {
    const deletedCard = await this.cardModel.findByIdAndDelete(id).exec();
    if (!deletedCard) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }
    return deletedCard;
  }
}
