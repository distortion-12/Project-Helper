"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isAdmin = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("admin_auth="));

    if (isAdmin) {
      router.replace("/admin");
    }
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include"
    });
    if (res.ok) {
      router.replace("/admin");
      router.refresh();
    } else {
      setError("Invalid username or password");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <form onSubmit={handleSubmit} className="bg-zinc-900 p-8 rounded-xl shadow-xl flex flex-col gap-4 min-w-[300px]">
        <h2 className="text-2xl font-bold text-white mb-2">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-400 text-sm">{error}</div>}
        <button type="submit" className="px-4 py-2 bg-green-600 rounded text-white font-semibold">Login</button>
      </form>
    </div>
  );
}
