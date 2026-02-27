"use client";
import React, { useState } from "react";

const BUDGET_OPTIONS = [
  "₹1K - ₹5K",
  "₹5K - ₹10K",
  "₹10K - ₹15K",
  "₹15K - ₹20K",
  "Other",
];

export default function StartProjectForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/start-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, budget, message }),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="p-6 bg-zinc-900 rounded-xl text-white">
        <h2 className="text-xl font-bold mb-2">Message Sent!</h2>
        <p className="mb-4">Thank you for reaching out. We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-zinc-900 rounded-xl text-white flex flex-col gap-4 min-w-[320px] max-w-[400px] mx-auto">
      <h2 className="text-2xl font-bold mb-2">Start a Project</h2>
      <p className="mb-4 text-zinc-400">Share your ideas and let's build something amazing.</p>
      <input
        type="text"
        placeholder="Your Name"
        className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="tel"
        placeholder="Your Phone Number"
        className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      />
      <div>
        <div className="mb-2 text-sm text-zinc-300">Project Budget (INR)</div>
        <div className="flex flex-wrap gap-2">
          {BUDGET_OPTIONS.map(opt => (
            <button
              type="button"
              key={opt}
              className={`px-3 py-1 rounded border ${budget === opt ? "bg-green-600 border-green-400 text-white" : "bg-zinc-800 border-zinc-700 text-zinc-200"}`}
              onClick={() => setBudget(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
      <textarea
        placeholder="Your Message"
        className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white min-h-[80px]"
        value={message}
        onChange={e => setMessage(e.target.value)}
        required
      />
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <button type="submit" className="px-4 py-2 bg-green-600 rounded text-white font-semibold mt-2" disabled={loading}>
        {loading ? "Sending..." : "LET'S CONNECT"}
      </button>
    </form>
  );
}
