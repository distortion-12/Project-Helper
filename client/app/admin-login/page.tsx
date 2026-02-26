"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-xl shadow-xl flex flex-col gap-4 min-w-[300px]">
        <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
        <input
          type="password"
          placeholder="Enter admin password"
          className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button type="submit" className="px-4 py-2 bg-indigo-600 rounded text-white font-semibold">Login</button>
      </form>
    </div>
  );
}
