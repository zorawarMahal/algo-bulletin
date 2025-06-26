import express from 'express';
import { requireAuth } from '../auth/requireAuth';
import { prisma } from '../lib/prisma';


const router = express.Router();

router.get('/me', requireAuth, async (req, res) => {
  const userId = (req as any).user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

export default router;
