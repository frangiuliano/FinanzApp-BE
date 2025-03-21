import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SpaceDocument = Space & Document;

@Schema({ timestamps: true })
export class Space {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: MongooseSchema.Types.ObjectId, ref: 'User' })
  owner: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  members: string[];

  @Prop({ default: 'personal', enum: ['personal', 'shared'] })
  type: 'personal' | 'shared';

  @Prop()
  description?: string;
}

export const SpaceSchema = SchemaFactory.createForClass(Space);
