import jwt from 'jsonwebtoken';

// Generate tokens for authentication jwt
function generateAccessToken(user: any) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || "1234", { expiresIn: '1800s' });
}
// Generate refresh tokens for authentication jwt
function generateRefreshToken(user: any) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || "4000", { expiresIn: '1y' });
}