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
  
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "",
    message: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    if (!phone) return true; // Phone is optional
    const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 7;
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      budget: "",
      message: "",
    };
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email (e.g., user@example.com)";
    }
    
    if (phone && !validatePhone(phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }
    
    if (!budget) {
      newErrors.budget = "Please select a budget range";
    }
    
    if (!message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.values(newErrors).every(err => err === "");
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/start-project`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, budget, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || data.message || "Failed to send message");
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
      
      {/* Name Field */}
      <div>
        <input
          type="text"
          placeholder="Your Name"
          className={`px-3 py-2 rounded bg-zinc-800 border text-white w-full ${errors.name ? "border-red-500" : "border-zinc-700"}`}
          value={name}
          onChange={e => {
            setName(e.target.value);
            if (errors.name) setErrors({...errors, name: ""});
          }}
          required
        />
        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
      </div>

      {/* Email Field */}
      <div>
        <input
          type="email"
          placeholder="Your Email"
          className={`px-3 py-2 rounded bg-zinc-800 border text-white w-full ${errors.email ? "border-red-500" : "border-zinc-700"}`}
          value={email}
          onChange={e => {
            setEmail(e.target.value);
            if (errors.email) setErrors({...errors, email: ""});
          }}
          required
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
      </div>

      {/* Phone Field */}
      <div>
        <input
          type="tel"
          placeholder="Your Phone Number"
          className={`px-3 py-2 rounded bg-zinc-800 border text-white w-full ${errors.phone ? "border-red-500" : "border-zinc-700"}`}
          value={phone}
          onChange={e => {
            const digitsOnly = e.target.value.replace(/\D/g, "");
            setPhone(digitsOnly);
            if (errors.phone) setErrors({...errors, phone: ""});
          }}
        />
        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
      </div>

      {/* Budget Field */}
      <div>
        <div className={`mb-2 text-sm ${errors.budget ? "text-red-400" : "text-zinc-300"}`}>
          Project Budget (INR)
        </div>
        <div className="flex flex-wrap gap-2">
          {BUDGET_OPTIONS.map(opt => (
            <button
              type="button"
              key={opt}
              className={`px-3 py-1 rounded border ${budget === opt ? "bg-green-600 border-green-400 text-white" : "bg-zinc-800 border-zinc-700 text-zinc-200"}`}
              onClick={() => {
                setBudget(opt);
                if (errors.budget) setErrors({...errors, budget: ""});
              }}
            >
              {opt}
            </button>
          ))}
        </div>
        {errors.budget && <p className="text-red-400 text-sm mt-1">{errors.budget}</p>}
      </div>

      {/* Message Field */}
      <div>
        <textarea
          placeholder="Your Message"
          className={`px-3 py-2 rounded bg-zinc-800 border text-white w-full min-h-[80px] ${errors.message ? "border-red-500" : "border-zinc-700"}`}
          value={message}
          onChange={e => {
            setMessage(e.target.value);
            if (errors.message) setErrors({...errors, message: ""});
          }}
          required
        />
        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
      </div>

      {error && <div className="text-red-400 text-sm bg-red-900 bg-opacity-30 p-2 rounded">{error}</div>}
      <button type="submit" className="px-4 py-2 bg-green-600 rounded text-white font-semibold mt-2 hover:bg-green-700 disabled:opacity-50" disabled={loading}>
        {loading ? "Sending..." : "LET'S CONNECT"}
      </button>
    </form>
  );
}
