"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for admin_auth cookie
    if (typeof document !== "undefined") {
      const isAdmin = document.cookie.split(';').some(c => c.trim().startsWith('admin_auth=1'));
      if (!isAdmin) {
        router.replace("/admin-login");
        return;
      }
    }
    async function fetchMessages() {
      const res = await fetch("/api/contact-admin-messages");
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
      setLoading(false);
    }
    fetchMessages();
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard: Contact Messages</h1>
      {loading ? (
        <div>Loading...</div>
      ) : messages.length === 0 ? (
        <div>No messages found.</div>
      ) : (
        <div className="space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
              <div className="mb-2 text-indigo-300 font-semibold">From: {msg.email}</div>
              <div className="mb-2 text-zinc-200">{msg.message}</div>
              <div className="text-xs text-zinc-400">{msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ""}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
