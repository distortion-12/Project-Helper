import React, { useState } from "react";

export default function ContactForm({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact-admin-messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
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
        <p className="mb-4">Thank you for contacting admin. We'll get back to you soon.</p>
        <button className="px-4 py-2 bg-indigo-600 rounded" onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-zinc-900 rounded-xl text-white flex flex-col gap-4 min-w-[300px]">
      <h2 className="text-xl font-bold">Contact Admin</h2>
      <label className="flex flex-col gap-1">
        Your Email
        <input
          type="email"
          required
          className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>
      <label className="flex flex-col gap-1">
        Message
        <textarea
          required
          className="px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white min-h-[80px]"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
      </label>
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <div className="flex gap-2 mt-2">
        <button type="submit" className="px-4 py-2 bg-indigo-600 rounded disabled:opacity-60" disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
        <button type="button" className="px-4 py-2 bg-zinc-700 rounded" onClick={onClose}>Cancel</button>
      </div>
    </form>
  );
}
