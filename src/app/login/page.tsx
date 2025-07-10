"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FiLogIn, FiUserPlus, FiKey } from "react-icons/fi";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      if (response.status === 200) {
        router.push("/profile");
      } else {
        setError("Wrong credentials");
      }
    } catch (error: unknown) {
      const err = error as { response?: { status: number } };
      if (err.response && err.response.status === 401) {
        setError("Wrong credentials");
      } else if (err.response && err.response.status === 404) {
        setError("User not found");
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
  }, [user]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="card w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2 flex items-center justify-center gap-2">
          <FiLogIn className="text-indigo-500" /> Login
        </h2>
        <p className="text-center text-gray-500 mb-6">Welcome back! Please login to your account.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              type="email"
              id="email"
              className="w-full"
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              type="password"
              id="password"
              className="w-full"
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="btn w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={buttonDisabled || loading}
          >
            {loading ? "Logging in..." : <><FiLogIn /> Login</>}
          </button>
        </form>
        <div className="flex flex-col gap-2 mt-6">
          <Link href="/signup" className="flex items-center justify-center gap-2 text-indigo-600 hover:underline text-sm">
            <FiUserPlus /> Don&apos;t have an account? Signup
          </Link>
          <Link href="/resetPass" className="flex items-center justify-center gap-2 text-indigo-600 hover:underline text-sm">
            <FiKey /> Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}