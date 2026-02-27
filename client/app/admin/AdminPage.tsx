"use client";
import React, { useEffect, useState } from "react";

export default function AdminPage() {
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [hireRequests, setHireRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAll() {
      try {
        // Contact messages
        const res1 = await fetch("/api/contact-admin-messages");
        if (res1.ok) {
          const data1 = await res1.json();
          setMessages(data1.messages || []);
        } else {
          const err1 = await res1.json();
          setError(err1.error || "Failed to load messages");
        }
        // Start project requests
        const res2 = await fetch("/api/start-project-requests");
        if (res2.ok) {
          const data2 = await res2.json();
          setProjects(data2.requests || []);
        }
        // Hire builder requests
        const res3 = await fetch("/api/hire-builder-requests");
        if (res3.ok) {
          const data3 = await res3.json();
          setHireRequests(data3.requests || []);
        }
      } catch (e) {
        setError("Network error or Supabase misconfiguration");
      }
      setLoading(false);
    }
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-400 text-lg">Error: {error}</div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Messages</h2>
          {messages.length === 0 ? (
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
          <h2 className="text-2xl font-bold mt-8 mb-4">Start Project Requests</h2>
          {projects.length === 0 ? (
            <div>No project requests found.</div>
          ) : (
            <div className="space-y-6">
              {projects.map((proj, idx) => (
                <div key={idx} className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <div className="mb-2 text-green-300 font-semibold">Name: {proj.name}</div>
                  <div className="mb-2 text-zinc-200">Email: {proj.email}</div>
                  <div className="mb-2 text-zinc-200">Phone: {proj.phone}</div>
                  <div className="mb-2 text-zinc-200">Budget: {proj.budget}</div>
                  <div className="mb-2 text-zinc-200">Message: {proj.message}</div>
                  <div className="text-xs text-zinc-400">{proj.createdAt ? new Date(proj.createdAt).toLocaleString() : ""}</div>
                </div>
              ))}
            </div>
          )}
          <h2 className="text-2xl font-bold mt-8 mb-4">Hire Builder Requests</h2>
          {hireRequests.length === 0 ? (
            <div>No hire builder requests found.</div>
          ) : (
            <div className="space-y-6">
              {hireRequests.map((req, idx) => (
                <div key={idx} className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
                  <div className="mb-2 text-blue-300 font-semibold">Name: {req.name}</div>
                  <div className="mb-2 text-zinc-200">Email: {req.email}</div>
                  <div className="mb-2 text-zinc-200">Phone: {req.phone}</div>
                  <div className="mb-2 text-zinc-200">Message: {req.message}</div>
                  <div className="text-xs text-zinc-400">{req.createdAt ? new Date(req.createdAt).toLocaleString() : ""}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
