import jwt from 'jsonwebtoken';
import { Person, Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Generate tokens for authentication jwt
export function generateAccessToken(user: Person) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "1234", { expiresIn: '1800s' });
}
// Generate refresh tokens for authentication jwt
export function generateRefreshToken(user: Person) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || "4000", { expiresIn: '1y' });
}