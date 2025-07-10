"use client";
import React, { useState } from "react";
import axios from "axios";
import { FiLock } from "react-icons/fi";

export default function ResetPass() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const sendResetLink = async (e: any) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            setLoading(true);
            const response = await axios.post("/api/users/resetPass", { email });
            if (response.status === 200) {
                setSuccess("Reset link sent to your email");
            }
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                setError("Email not found");
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center">
            <div className="card w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-2 text-center flex items-center justify-center gap-2">
                    <FiLock className="text-indigo-500" /> Reset Password
                </h2>
                <p className="text-center text-gray-500 mb-6">Enter your email to receive a reset link.</p>
                <form onSubmit={sendResetLink} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            id="email"
                            className="w-full"
                            placeholder="Enter your email"
                            autoComplete="email"
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    {success && <div className="text-green-600 text-sm text-center">{success}</div>}
                    <button
                        type="submit"
                        className="btn w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={loading || !email}
                    >
                        {loading ? "Sending..." : <><FiLock /> Send Reset Link</>}
                    </button>
                </form>
            </div>
        </div>
    );
}