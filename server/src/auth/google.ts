import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { prisma } from '../lib/prisma';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: `https://algo-bulletin.onrender.com/auth/google/callback`,
        },
        async (_, __, profile, done) => {
            try {
                const user = await prisma.user.upsert({
                    where: { email: profile.emails?.[0].value || '' },
                    update: {},
                    create: {
                        email: profile.emails?.[0].value || '',
                        name: profile.displayName,
                        image: profile.photos?.[0].value || '',
                    },
                });
                return done(null, user);
            } catch (error) {
                return done(error, undefined);
            }
        }
    )
);
