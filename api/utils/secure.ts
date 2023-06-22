import jwt from 'jsonwebtoken';
import { Person, Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Generate tokens for authentication jwt
export function generateAccessToken(person: Person) {
    return jwt.sign(person, process.env.ACCESS_TOKEN_SECRET || "1234", { expiresIn: '1800s' });
}
