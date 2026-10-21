"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

export default function Charts() {
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCurrent = true;

    const fetchData = async () => {
      try {
        const response = await fetch("/api/getnumber", { method: "GET" });
        if (!response.ok) {
          throw new Error(`Could not load activity data (${response.status}).`);
        }

        const payload = await response.json();
        const accounts = payload?.result?.accounts;
        if (!accounts || typeof accounts !== "object") {
          throw new Error("The activity service returned an unexpected response.");
        }

        const activity = Object.entries(accounts)
          .map(([date, counts]) => {
            const parsedDate = new Date(date);
            if (Number.isNaN(parsedDate.getTime())) return null;
            return {
              date: parsedDate,
              accountsCreated: Number(Array.isArray(counts) ? counts[0] : 0) || 0,
              existingAccountRequests: Number(Array.isArray(counts) ? counts[1] : 0) || 0,
            };
          })
          .filter(Boolean)
          .sort((first, second) => first.date - second.date);

        if (isCurrent) {
          setChartData({
            labels: activity.map((item) =>
              item.date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
            ),
            datasets: [
              {
                label: "Accounts created",
                data: activity.map((item) => item.accountsCreated),
                borderColor: "#e85d3f",
                backgroundColor: "rgba(232, 93, 63, 0.12)",
                borderWidth: 2,
                fill: true,
                tension: 0.35,
                pointRadius: 3,
              },
              {
                label: "Existing account activity",
                data: activity.map((item) => item.existingAccountRequests),
                borderColor: "#0891b2",
                backgroundColor: "rgba(8, 145, 178, 0.12)",
                borderWidth: 2,
                fill: true,
                tension: 0.35,
                pointRadius: 3,
              },
            ],
          });
        }
      } catch (fetchError) {
        console.error("Error loading community activity:", fetchError);
        if (isCurrent) {
          setError(fetchError.message || "Could not load activity data.");
        }
      }
    };

    fetchData();
    return () => {
      isCurrent = false;
    };
  }, []);

  if (error) {
    return (
      <div role="alert" className="flex h-full items-center justify-center rounded-xl bg-rose-50 p-4 text-center text-sm text-rose-700">
        {error}
      </div>
    );
  }

  if (!chartData) {
    return (
      <div role="status" className="flex h-full items-center justify-center text-sm text-slate-500">
        Loading activity...
      </div>
    );
  }

  if (chartData.labels.length === 0) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl bg-slate-50 text-center text-sm text-slate-500">
        No community activity to show yet.
      </div>
    );
  }

  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          legend: { position: "bottom", labels: { usePointStyle: true, boxWidth: 8 } },
        },
        scales: {
          x: { grid: { display: false } },
          y: { beginAtZero: true, grid: { color: "#e2e8f0" } },
        },
      }}
    />
  );
}
