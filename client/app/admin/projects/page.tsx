"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type RawProject = {
  id?: string | number;
  name?: string;
  title?: string;
  project_name?: string;
  github?: string;
  repo?: string;
  repo_link?: string;
  repository?: string;
  repository_url?: string;
  createdAt?: string;
  created_at?: string;
};

type ProjectView = {
  id: string;
  name: string;
  repoLink: string;
  createdAt?: string;
};

function toProjectView(raw: RawProject, index: number): ProjectView {
  const name = raw.name || raw.title || raw.project_name || "Untitled Project";
  const repoLink =
    raw.github || raw.repo_link || raw.repo || raw.repository_url || raw.repository || "";

  return {
    id: String(raw.id ?? index),
    name,
    repoLink,
    createdAt: raw.createdAt || raw.created_at,
  };
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<ProjectView[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copiedProjectId, setCopiedProjectId] = useState<string | null>(null);
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

  async function copyRepoLink(projectId: string, repoLink: string) {
    if (!repoLink) {
      return;
    }

    try {
      await navigator.clipboard.writeText(repoLink);
      setCopiedProjectId(projectId);
      setTimeout(() => setCopiedProjectId(null), 1500);
    } catch {
      setError("Could not copy repo link. Please copy it manually.");
    }
  }

  useEffect(() => {
    const isAdmin = document.cookie
      .split(";")
      .some((cookie) => cookie.trim().startsWith("admin_auth="));

    if (!isAdmin) {
      router.replace("/admin-login");
      return;
    }

    async function loadProjects() {
      try {
        const response = await fetch("/api/projects", { credentials: "include" });
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json?.error || "Failed to fetch projects");
        }

        const rawProjects: RawProject[] = Array.isArray(json.projects)
          ? json.projects
          : Array.isArray(json.data)
            ? json.data
            : [];

        setProjects(rawProjects.map(toProjectView));
      } catch (err: any) {
        setError(err?.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, [router]);

  const filteredProjects = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) {
      return projects;
    }

    return projects.filter(
      (project) =>
        project.name.toLowerCase().includes(term) ||
        project.repoLink.toLowerCase().includes(term)
    );
  }, [projects, query]);

  return (
    <div className="min-h-screen bg-black p-8 text-white">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="mt-2 text-zinc-300">
            All database projects with repo links for quick matching with student requests.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="inline-block rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 hover:bg-zinc-900"
          >
            Back to Admin Dashboard
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="rounded-lg border border-red-500 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-900/30 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by project name or repo link"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-400 focus:border-green-500"
        />
      </div>

      {loading ? <div>Loading projects...</div> : null}
      {error ? <div className="text-red-400">Error: {error}</div> : null}

      {!loading && !error ? (
        filteredProjects.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-300">
            No projects found.
          </div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-zinc-800 bg-zinc-950">
                <tr>
                  <th className="px-4 py-3 text-zinc-300">Project Name</th>
                  <th className="px-4 py-3 text-zinc-300">Repository Link</th>
                  <th className="px-4 py-3 text-zinc-300">Created</th>
                  <th className="px-4 py-3 text-zinc-300">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} className="border-b border-zinc-800 last:border-b-0">
                    <td className="px-4 py-3 font-medium text-green-300">{project.name}</td>
                    <td className="px-4 py-3">
                      {project.repoLink ? (
                        <a
                          href={project.repoLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-300 underline underline-offset-4 hover:text-blue-200"
                        >
                          {project.repoLink}
                        </a>
                      ) : (
                        <span className="text-zinc-500">No repo link</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-zinc-400">
                      {project.createdAt ? new Date(project.createdAt).toLocaleString() : "-"}
                    </td>
                    <td className="px-4 py-3">
                      {project.repoLink ? (
                        <button
                          type="button"
                          onClick={() => copyRepoLink(project.id, project.repoLink)}
                          className="rounded-md border border-zinc-700 px-3 py-1 text-xs font-semibold text-zinc-200 hover:bg-zinc-800"
                        >
                          {copiedProjectId === project.id ? "Copied" : "Copy Repo Link"}
                        </button>
                      ) : (
                        <span className="text-zinc-500">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : null}
    </div>
  );
}
