import { ApiProperty } from "@nestjs/swagger";

export class ImageUploadDto {
    @ApiProperty({ type: "string", format: "binary", description: "Chọn ảnh để upload" })
    image_file: any
}