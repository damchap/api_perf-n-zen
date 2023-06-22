import jwt from 'jsonwebtoken';
import { Person, Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Generate tokens for authentication jwt
export function generateAccessToken(person: Person) {
    return jwt.sign(person, process.env.ACCESS_TOKEN_SECRET || "1234", { expiresIn: '1800s' });
}
// Generate refresh tokens for authentication jwt
export function generateRefreshToken(person: Person) {
    return jwt.sign(person, process.env.REFRESH_TOKEN_SECRET || "4000", { expiresIn: '1d' });
}