import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @ApiProperty({example: "phap@gmail.com"})
    email?: string;

    @IsOptional()
    @ApiProperty({ example: "Phap Lu Quoc"})
    fullName?: string;

    @IsOptional()
    @ApiProperty({ example: "25" })
    age?: number;
}
