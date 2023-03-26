import { IsNotEmpty, IsString } from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

export class ObjectId {
  @IsString()
  @IsNotEmpty()
  id: MongooseSchema.Types.ObjectId;
}
