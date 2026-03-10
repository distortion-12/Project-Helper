"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [hireRequests, setHireRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    try {
      setLoggingOut(true);
      await fetch("/api/admin-logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      router.replace("/");
      router.refresh();
      setLoggingOut(false);
    }
  }

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
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-900/30 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-400 text-lg">Error: {error}</div>
      ) : (
        <>
          <section className="mb-10 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <h2 className="text-2xl font-bold text-green-300">Projects Library</h2>
            <p className="mt-2 text-zinc-300">
              Open all available projects with repo links so you can directly map student
              requests to an existing project.
            </p>
            <Link
              href="/admin/projects"
              className="mt-4 inline-block rounded-lg bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-500"
            >
              Open Projects Page
            </Link>
          </section>

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
                  <div className="text-xs text-zinc-400">{(proj.createdAt || proj.createdat) ? new Date(proj.createdAt || proj.createdat).toLocaleString() : ""}</div>
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
                  <div className="mb-2 text-zinc-200">Description: {req.project_description || req.message}</div>
                  {req.additional_info && <div className="mb-2 text-zinc-400">Additional Info: {req.additional_info}</div>}
                  <div className="text-xs text-zinc-400">{(req.createdAt || req.created_at) ? new Date(req.createdAt || req.created_at).toLocaleString() : ""}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
