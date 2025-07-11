import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import authRoutes from './routes/auth';
import { connectRedis } from './lib/redis';
import userRoutes from './routes/user';
import leetcodeRoutes from './routes/leetcode';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

app.use(cors({ origin: ["${process.env.CLIENT_URL}", "http://localhost:5173"], credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use('/api', leetcodeRoutes);
app.use('/api', userRoutes);
app.use('/auth', authRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

connectRedis().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
