import express from "express";
import { requireAuth } from "../auth/requireAuth";
import { fetchLeetCodeStats } from "../services/leetcode";

const router = express.Router();

router.post("/leetcode", requireAuth, async (req, res) => {
  const { username } = req.body;
  const userId = (req as any).user.id;

  if (!username) {
    res.status(400).json({ error: "Username required" });
    return;
  }

  try {
    const stats = await fetchLeetCodeStats(username, userId);
    res.json({ stats });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
