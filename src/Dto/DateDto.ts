import { IsNotEmpty, IsString, Length } from 'class-validator';

export class DateDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 10)
  date: string;
}
