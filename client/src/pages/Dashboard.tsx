import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { Input } from "@/components/ui/input";
import {Button} from '@/components/ui/button'

type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  leetcode?: object;
  codechef?: object;
  codeforces?: object;
  hackerrank?: object;
  atcoder?: object;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [leetcodeStats, setLeetcodeStats] = useState<any>(null);

  useEffect(() => {
    // Parse token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/dashboard");
    }

    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      axios
        .get(`${process.env.SERVER_URL}/api/me`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        })
        .then((res: any) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          console.error("Failed to fetch user", err);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!user)
    return <div className="text-center mt-10">Loading dashboard...</div>;

  const connectLeetcode = async () => {
    const token = localStorage.getItem("token");

    const res: any = await axios.post(
      `${process.env.SERVER_URL}/api/leetcode`,
      { username: leetcodeUsername },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setLeetcodeStats(res.data.stats);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4">
      <Card>
        <CardContent className="flex items-center space-x-4 p-4">
          <Avatar>
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.name?.[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Placeholder Cards for Stats */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col space-y-2">
            {leetcodeStats ? (
              <>
                <div className="font-semibold">LeetCode Stats:</div>
                <div>Ranking: {leetcodeStats.ranking}</div>
                <div>Total Solved: {leetcodeStats.totalSolved}</div>
                <div>Easy: {leetcodeStats.easySolved}</div>
                <div>Medium: {leetcodeStats.mediumSolved}</div>
                <div>Hard: {leetcodeStats.hardSolved}</div>
              </>
            ) : (
              <>
                <Input
                  placeholder="Enter your LeetCode username"
                  value={leetcodeUsername}
                  onChange={(e) => setLeetcodeUsername(e.target.value)}
                />
                <Button onClick={connectLeetcode}>Connect LeetCode</Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          CodeChef: {user.codechef ? "Connected" : "Not Linked"}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          Codeforces: {user.codeforces ? "Connected" : "Not Linked"}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          HackerRank: {user.hackerrank ? "Connected" : "Not Linked"}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          AtCoder: {user.atcoder ? "Connected" : "Not Linked"}
        </CardContent>
      </Card>

      <button
        className="bg-red-500 text-white px-6 py-2 rounded active:bg-red-600"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
