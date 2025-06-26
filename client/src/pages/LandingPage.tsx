import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useEffect } from "react";

export default function LandingPage() {
  // Redirect to dashboard if token already exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleLogin = () => {
    window.location.href = `https://algo-bulletin.onrender.com/auth/google`;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 to-gray-900 text-white px-6">
      <div className="text-center space-y-4 max-w-xl">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Coding Profile Tracker
        </h1>
        <p className="text-gray-400 text-lg">
          View all your competitive programming stats from LeetCode, Codeforces, CodeChef, HackerRank, and AtCoder — all in one place.
        </p>
        <Button
          onClick={handleLogin}
          className="text-lg mt-6 bg-white text-black hover:bg-gray-200 px-6 py-5 font-semibold"
        >
          <img
            src="https://cdn.pixabay.com/photo/2017/01/19/09/11/logo-google-1991840_1280.png"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Login with Google
          <MoveRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
