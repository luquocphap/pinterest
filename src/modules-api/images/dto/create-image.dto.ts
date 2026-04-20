import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateImageDto {
    @IsNotEmpty()
    title: string;

    @IsOptional()
    description: string;
}
