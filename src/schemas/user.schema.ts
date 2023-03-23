import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Todos } from './todo.schemas';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  login: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todos' }],
    default: Array<Todos>,
  })
  todos: Todos[];
}

export const UserSchema = SchemaFactory.createForClass(User);
