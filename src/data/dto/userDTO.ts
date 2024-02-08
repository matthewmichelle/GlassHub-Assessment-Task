// image.dto.ts

import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UserDto {
    @IsOptional()
    @IsString()
    id: Date;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;
}
