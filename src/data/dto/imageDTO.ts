// image.dto.ts

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ImageDto {

  @IsOptional()
  @IsString()
  uploadTimestamp: Date;

  @IsOptional()
  @IsNumber()
  latitude: number;

  @IsOptional()
  @IsNumber()
  longitude: number;

  @IsOptional()
  @IsNumber()
  userId: number;
}
