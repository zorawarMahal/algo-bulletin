import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function signToken(payload: object) {
    return jwt.sign(payload, process.env.JWT_SECRET!, {expiresIn: '7d'});
}

export function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET!);
}