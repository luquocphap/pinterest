import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class SaveDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: "2"} )
    imageId!: number;
}