import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsNumber()
    imageId: number;

    @IsNotEmpty()
    content: string;
}
