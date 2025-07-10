"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FiLock } from 'react-icons/fi';

export default function VerifyPage() {
    const router = useRouter();
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        const url = window.location.search;
        const val = new URLSearchParams(url).get("token");
        setToken(val || "");
    }, []);

    const handleVerify = async () => {
        setLoading(true);
        setError("");
        setSuccess("");
        try {
            await axios.post('/api/users/verify', { token });
            setSuccess("Account verified! Redirecting to login...");
            setTimeout(() => router.push('/login'), 1200);
        } catch (err : unknown) {
    // Show the backend error if available
            const error = err as { response?: { data?: { error?: string } } };
            setError(error.response?.data?.error || "Verification failed. Please try again.");
            console.error(error.response?.data || error);
        }   finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center">
            <div className="card w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                    <FiLock className="text-indigo-500" /> Verify Your Account
                </h1>
                <p className="text-gray-700 mb-4">Click the button below to verify your account.</p>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                {success && <p className="text-green-600 mb-2">{success}</p>}
                <button 
                    onClick={handleVerify}
                    className="btn w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    disabled={loading || !token}
                >
                    {loading ? "Verifying..." : <><FiLock /> Verify Now</>}
                </button>
            </div>
        </div>
    );
}