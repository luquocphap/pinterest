import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class RegisterBody {
    @IsNotEmpty()
    @IsEmail(undefined, { message: "Invalid Email" })
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    fullName: string;

    @IsOptional()
    age: number;
}