import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginBody {
    @IsNotEmpty()
    @IsEmail(undefined, {message: "email error"})
    email: string;

    @IsNotEmpty()
    password: string;
}