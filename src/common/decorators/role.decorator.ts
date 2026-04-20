
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'ROLE_KEY';
export const ROLE = (role: "ADMIN" | "USER" | "SUPER_ADMIN") => SetMetadata(ROLE_KEY, role);