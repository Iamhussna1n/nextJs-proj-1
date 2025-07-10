"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiUserPlus, FiLogIn, FiLock } from "react-icons/fi";

export default function SignUpPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const mysignup = async (e: any) => {
    e.preventDefault();
    setError("");
    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch (error) {
      setError("An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setButtonDisabled(!(
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.confirmPassword.length > 0 &&
      user.username.length > 0
    ));
  }, [user]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="card w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-2 flex items-center justify-center gap-2">
          <FiUserPlus className="text-indigo-500" /> Sign Up
        </h2>
        <p className="text-center text-gray-500 mb-6">Create your account to get started.</p>
        <form onSubmit={mysignup} className="space-y-4">
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
            <label className="block text-sm font-medium mb-1" htmlFor="username">
              Username
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type="text"
              id="username"
              className="w-full"
              placeholder="Enter your username"
              autoComplete="username"
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
              autoComplete="new-password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
              type="password"
              id="confirmPassword"
              className="w-full"
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
          </div>
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            disabled={buttonDisabled || loading}
            type="submit"
            className="btn w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing Up..." : <><FiUserPlus /> Sign Up</>}
          </button>
        </form>
        <div className="flex flex-col gap-2 mt-6">
          <Link href="/login" className="flex items-center justify-center gap-2 text-indigo-600 hover:underline text-sm">
            <FiLogIn /> Already have an account? Login
          </Link>
        </div>
      </div>
    </div>
  );
}