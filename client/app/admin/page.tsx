"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function AdminDashboard() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Check for admin_auth cookie
    if (typeof document !== "undefined") {
      const isAdmin = document.cookie.split(';').some(c => c.trim().startsWith('admin_auth='));
      if (!isAdmin) {
        router.replace("/admin-login");
        return;
      }
    }
    async function fetchMessages() {
      try {
        const res = await fetch("/api/contact-admin-messages");
        if (res.ok) {
          const data = await res.json();
          setMessages(data.messages || []);
        } else {
          const err = await res.json();
          setError(err.error || "Failed to load messages");
        }
      } catch (e) {
        setError("Network error or Supabase misconfiguration");
      }
      setLoading(false);
    }
    fetchMessages();
  }, [router]);

    // Placeholder: redirect to login or show message
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <h1 className="text-2xl">Please login to access admin dashboard.</h1>
      </div>
    );
}
 