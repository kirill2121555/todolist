import { IsNotEmpty, Length } from 'class-validator';

export class SingUpDto {
  @Length(5, 12)
  @IsNotEmpty()
  login: string;

  @Length(5, 12)
  @IsNotEmpty()
  password: string;
}
