"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FaRegTrashAlt, FaSyncAlt } from "react-icons/fa";

export default function AllBlogs({ searchQuery = "" }) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingBlogId, setDeletingBlogId] = useState("");

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/blog", { method: "GET" });
      if (!response.ok) {
        throw new Error(`Could not load blogs (${response.status}).`);
      }

      const result = await response.json();
      if (!Array.isArray(result.data)) {
        throw new Error("The blog service returned an unexpected response.");
      }
      setBlogs(result.data);
    } catch (fetchError) {
      console.error("Error loading admin blogs:", fetchError);
      setError(fetchError.message || "Could not load blogs. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const visibleBlogs = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    return blogs.filter((blog) => {
      if (blog.isDeleted) return false;
      if (!normalizedQuery) return true;

      return [blog.title, blog.description, blog.type, blog.authorName]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalizedQuery));
    });
  }, [blogs, searchQuery]);

  const handleBlogDelete = async (blog) => {
    if (!window.confirm(`Move "${blog.title || "this post"}" to deleted blogs?`)) {
      return;
    }

    setDeletingBlogId(blog._id);
    setError("");
    try {
      const response = await fetch("/api/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: blog._id }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Could not delete this blog. Please try again.");
      }
      setBlogs((currentBlogs) =>
        currentBlogs.map((currentBlog) =>
          currentBlog._id === blog._id ? { ...currentBlog, isDeleted: true } : currentBlog
        )
      );
    } catch (deleteError) {
      console.error("Error deleting admin blog:", deleteError);
      setError(deleteError.message || "Could not delete this blog. Please try again.");
    } finally {
      setDeletingBlogId("");
    }
  };

  if (loading) {
    return (
      <div role="status" className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-slate-600 shadow-sm">
        Loading blog posts...
      </div>
    );
  }

  return (
    <section aria-labelledby="all-blogs-heading">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="all-blogs-heading" className="text-2xl font-bold text-slate-900">
            All blog posts
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {visibleBlogs.length} {visibleBlogs.length === 1 ? "post" : "posts"}
            {searchQuery.trim() ? " matching your search" : " published or in progress"}
          </p>
        </div>
        <button
          type="button"
          onClick={fetchBlogs}
          className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          <FaSyncAlt aria-hidden="true" />
          Refresh
        </button>
      </div>

      {error && (
        <div role="alert" className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          <span>{error}</span>
          <button type="button" onClick={fetchBlogs} className="font-semibold underline">
            Try again
          </button>
        </div>
      )}

      {visibleBlogs.length === 0 ? (
        !error && (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold text-slate-800">
              {searchQuery.trim() ? "No matching blog posts" : "No blog posts yet"}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              {searchQuery.trim()
                ? "Try a different search term."
                : "Create a blog post to see it listed here."}
            </p>
          </div>
        )
      ) : (
        <div className="grid gap-4 xl:grid-cols-2">
          {visibleBlogs.map((blog) => (
            <article
              key={blog._id}
              className="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:flex-row"
            >
              <div className="relative h-48 shrink-0 bg-slate-100 sm:h-auto sm:min-h-48 sm:w-48">
                <Image
                  src={blog.image || "/default_banner.webp"}
                  alt=""
                  width={240}
                  height={180}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col p-5">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  {blog.type && (
                    <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-800">
                      {blog.type}
                    </span>
                  )}
                  {blog.date && (
                    <time dateTime={new Date(blog.date).toISOString()} className="text-xs text-slate-500">
                      {new Date(blog.date).toLocaleDateString()}
                    </time>
                  )}
                </div>
                <h3 className="break-words text-lg font-semibold text-slate-900">
                  {blog.title || "Untitled post"}
                </h3>
                {blog.description && (
                  <p className="mt-2 line-clamp-3 break-words text-sm leading-6 text-slate-600">
                    {blog.description}
                  </p>
                )}
                <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                  <span className="truncate text-xs text-slate-500">
                    {blog.authorName || "HelpOps Hub"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleBlogDelete(blog)}
                    disabled={deletingBlogId === blog._id}
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-rose-200 px-3 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-50 disabled:cursor-wait disabled:opacity-50"
                  >
                    <FaRegTrashAlt aria-hidden="true" />
                    {deletingBlogId === blog._id ? "Removing..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
