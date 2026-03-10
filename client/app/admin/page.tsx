"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const AdminPage = dynamic(() => import("./AdminPage"), { ssr: false });

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("admin_auth="));

    if (!isAdmin) {
      router.replace("/admin-login");
    }
  }, [router]);

  return <AdminPage />;
}
 