import express from 'express';
import passport from 'passport';
import '../auth/google';
import { signToken } from '../auth/jwt';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Entry point to OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback from Google
router.post(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    (req: any, res) => {
        const user = req.user;
        const token = signToken({ id: user.id, email: user.email });

        // Send token to frontend via cookie or redirect
        res.redirect(`https://algo-bulletin-frontend.onrender.com/dashboard?token=${token}`);
    }
);

export default router;
