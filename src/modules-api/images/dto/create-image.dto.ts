import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateImageDto {
    @IsNotEmpty()
    @ApiProperty({example: "Conan Movie"})
    title!: string;

    @IsOptional()
    @ApiProperty({example: "Phim điện ảnh thám tử lừng danh conan"})
    description!: string;
}
