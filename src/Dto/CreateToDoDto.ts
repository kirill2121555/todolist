import { IsNotEmpty, IsBoolean, IsString } from 'class-validator';

export class CreateToDoDto {
  @IsNotEmpty()
  text: string;

  @IsString()
  date?: string;

  @IsBoolean()
  status?: boolean;
}

export class DateDto {
  @IsNotEmpty()
  @IsString()
  date: string;
}
