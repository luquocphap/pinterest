import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class FindImageDto {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({ example: "1", required: false })
    page?: number;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @ApiProperty({ example: "3", required: false })
    pageSize?: number;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: "conan", required: false })
    queryName?: string;
}