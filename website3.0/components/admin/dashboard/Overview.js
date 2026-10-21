"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Legend,
  Title,
  Tooltip,
} from "chart.js";
import Charts from "../Charts/Charts";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Overview = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/blog", { method: "GET" });
      if (!response.ok) {
        throw new Error(`Could not load dashboard data (${response.status}).`);
      }

      const result = await response.json();
      if (!Array.isArray(result.data)) {
        throw new Error("The blog service returned an unexpected response.");
      }
      setBlogs(result.data.filter((blog) => !blog.isDeleted));
    } catch (fetchError) {
      console.error("Error loading admin overview:", fetchError);
      setError(fetchError.message || "Could not load dashboard data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const metrics = useMemo(
    () => ({
      blogs: blogs.length,
      views: blogs.reduce((total, blog) => total + (Number(blog.views) || 0), 0),
      likes: blogs.reduce(
        (total, blog) =>
          total +
          (Array.isArray(blog.reactionList)
            ? blog.reactionList.reduce(
                (reactionTotal, reaction) =>
                  reactionTotal + (Number(reaction.count) || 0),
                0
              )
            : 0),
        0
      ),
    }),
    [blogs]
  );

  const chartData = useMemo(() => {
    const countsByDate = new Map();
    blogs.forEach((blog) => {
      const date = new Date(blog.date);
      if (Number.isNaN(date.getTime())) return;
      const key = date.toISOString().slice(0, 10);
      countsByDate.set(key, (countsByDate.get(key) || 0) + 1);
    });

    const dates = [...countsByDate.keys()].sort();
    return {
      labels: dates.map((date) =>
        new Date(`${date}T00:00:00`).toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
        })
      ),
      datasets: [
        {
          label: "Blog posts",
          data: dates.map((date) => countsByDate.get(date)),
          backgroundColor: "#0e7490",
          borderRadius: 6,
          maxBarThickness: 32,
        },
      ],
    };
  }, [blogs]);

  const metricCards = [
    { label: "Active blog posts", value: metrics.blogs, accent: "bg-cyan-600" },
    { label: "Total views", value: metrics.views.toLocaleString(), accent: "bg-indigo-600" },
    { label: "Total reactions", value: metrics.likes.toLocaleString(), accent: "bg-amber-500" },
  ];

  return (
    <section aria-labelledby="overview-heading">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="overview-heading" className="text-2xl font-bold text-slate-900">
            Dashboard overview
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            A quick view of your HelpOps Hub blog activity.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchBlogs}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
        >
          Refresh data
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

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metricCards.map((metric) => (
          <article
            key={metric.label}
            className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <span className={`h-12 w-1.5 shrink-0 rounded-full ${metric.accent}`} />
            <div>
              <p className="text-sm font-medium text-slate-500">{metric.label}</p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
                {loading || error ? "-" : metric.value}
              </p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 grid min-w-0 gap-6 xl:grid-cols-2">
        <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-slate-900">Blog publishing activity</h3>
          <p className="mb-5 mt-1 text-sm text-slate-500">Posts created by date</p>
          {loading ? (
            <div role="status" className="flex h-72 items-center justify-center text-sm text-slate-500">
              Loading activity...
            </div>
          ) : error ? (
            <div className="flex h-72 items-center justify-center rounded-xl bg-slate-50 text-center text-sm text-slate-500">
              Activity is unavailable until dashboard data can be loaded.
            </div>
          ) : chartData.labels.length ? (
            <div className="h-72 w-full">
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    tooltip: {
                      callbacks: {
                        label: (context) => ` ${context.parsed.y} ${context.parsed.y === 1 ? "post" : "posts"}`,
                      },
                    },
                  },
                  scales: {
                    x: { grid: { display: false } },
                    y: { beginAtZero: true, ticks: { precision: 0 }, grid: { color: "#e2e8f0" } },
                  },
                }}
              />
            </div>
          ) : (
            <div className="flex h-72 items-center justify-center rounded-xl bg-slate-50 text-center text-sm text-slate-500">
              No blog activity to show yet.
            </div>
          )}
        </article>

        <article className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <h3 className="text-lg font-semibold text-slate-900">Community activity</h3>
          <p className="mb-5 mt-1 text-sm text-slate-500">
            New accounts and existing-account activity recorded by the app
          </p>
          <div className="h-72 w-full">
            <Charts />
          </div>
        </article>
      </div>
    </section>
  );
};

export default Overview;
