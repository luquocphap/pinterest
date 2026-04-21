import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: "1"})
    imageId!: number;

    @IsNotEmpty()
    @ApiProperty({ example: "So beautiful" })
    content!: string;
}
