"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FiLock } from "react-icons/fi";

export default function NewPass() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const url = window.location.search;
        const val = new URLSearchParams(url).get("token");
        setToken(val || "");
    }, []);

    const submitPass = async (e: any) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            if (!token) {
                setError("Invalid or missing token.");
                return;
            }
            setLoading(true);
            const response = await axios.post("/api/users/newPass", {
                token: token,
                newPassword: newPassword,
            });
            if (response.status === 200) {
                setSuccess("Password updated successfully!");
                setTimeout(() => router.push("/login"), 1200);
            }
        } catch (error: any) {
            setError("Failed to set new password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center">
            <div className="card w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-2 text-center flex items-center justify-center gap-2">
                    <FiLock className="text-indigo-500" /> Set New Password
                </h2>
                <p className="text-center text-gray-500 mb-6">Enter your new password below.</p>
                <form onSubmit={submitPass} className="space-y-4">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1">New Password</label>
                        <input
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            type="password"
                            id="password"
                            className="w-full"
                            placeholder="Enter your new password"
                            autoComplete="new-password"
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                    <button
                        type="submit"
                        className="btn w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={loading || !newPassword}
                    >
                        {loading ? "Setting..." : <><FiLock /> Set New Password</>}
                    </button>
                </form>
            </div>
        </div>
    );
}
