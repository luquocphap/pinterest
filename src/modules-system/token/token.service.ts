import { BadRequestException } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "src/common/constants/app.constant";
import { TokenPayload } from "./token.types";


export class TokenService {
    createAccessToken(userId){
        if (!userId) {
            throw new BadRequestException("Invalid UserId");
        }

        const accessToken = jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET as string, { expiresIn: "15m" });

        return accessToken;
    }

    createRefreshToken(userId) {
        if (!userId) {
            throw new BadRequestException("không có userId để tạo token");
        }

        // refreshToken <=> RT (ghi tắt)
        const refreshToken = jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET as string, { expiresIn: "1d" });

        return refreshToken;
    }

    verifyAccessToken(acccessToken: string, option?: jwt.VerifyOptions): TokenPayload {
        const decode = jwt.verify(acccessToken, ACCESS_TOKEN_SECRET as string, option) as TokenPayload;
        console.log({decode})
        return decode
    }
    verifyRefreshToken(refreshToken: string, option?: jwt.VerifyOptions): TokenPayload {
        const decode = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET as string, option) as TokenPayload;
        return decode
    }
}