/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class GetStatsDto {
  @IsNotEmpty()
  startDate: string;

  @IsNotEmpty()
  endDate: string;
}
