import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type TodosDocument = HydratedDocument<Todos>;

@Schema()
export class Todos {
  @Prop({ required: true })
  text: string;

  @Prop({ default: false })
  done: boolean;

  @Prop({ default: new Date().toLocaleDateString() })
  date: string;
}

export const TodosSchema = SchemaFactory.createForClass(Todos);
