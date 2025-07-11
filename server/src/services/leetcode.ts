import axios from "axios";
import { redis } from "../lib/redis";
import { prisma } from "../lib/prisma";

// Define the response shape
type LeetCodeStats = {
  status?: string;
  ranking: number;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  contributionPoints?: number;
  acceptanceRate?: number;
  // Add other fields as needed
};

export async function fetchLeetCodeStats(username: string, userId: string) {
  const cacheKey = `leetcode:${username}`;

  // Try Redis cache
  const cached = await redis.get(cacheKey);
  if (cached) return JSON.parse(cached) as LeetCodeStats;

  // Fetch from external API
  const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
  const data = response.data as LeetCodeStats;

  if (data.status === "error") {
    throw new Error("Invalid LeetCode username");
  }

  // Cache result
  await redis.set(cacheKey, JSON.stringify(data), { EX: 3600 });

  // Save to DB (PostgreSQL via Prisma JSON field)
  await prisma.user.update({
    where: { id: userId },
    data: {
      leetcode: data, // now TS knows this is valid JSON
    },
  });

  return data;
}
