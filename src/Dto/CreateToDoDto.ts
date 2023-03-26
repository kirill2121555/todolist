import { IsNotEmpty, IsBoolean, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateToDoDto {
  @IsNotEmpty()
  public text: string;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  done?: boolean;
}
