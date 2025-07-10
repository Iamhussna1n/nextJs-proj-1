"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { FiUser, FiLogOut, FiEye } from "react-icons/fi";

export default function UserProfile() {
  const router = useRouter();
  const [userData, setUserData] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUserData(response.data._id);
      } catch (error) {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [router]);

  const logout = async () => {
    await axios.get("/api/users/logout");
    router.push("/login");
  };

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="card w-full max-w-md text-center">
        <div className="flex items-center justify-center mb-4">
          <FiUser className="text-4xl text-indigo-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">User Profile</h2>
        <p className="text-gray-600 mb-6">This is the user profile page.</p>
        <button
          onClick={logout}
          className="btn w-full flex items-center justify-center gap-2 mb-4"
        >
          <FiLogOut /> Logout
        </button>
        <button className="btn w-full flex items-center justify-center gap-2">
          {loading ? (
            "Loading..."
          ) : userData ? (
            <Link href={`/profile/${userData}/husnain`} className="flex items-center gap-2">
              <FiEye /> View Profile
            </Link>
          ) : (
            "No user data"
          )}
        </button>
      </div>
    </div>
  );
}