import { Length } from 'class-validator';

export class ObjectId {
  @Length(24, 24)
  id: string;
}
