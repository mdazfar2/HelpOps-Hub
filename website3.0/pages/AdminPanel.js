"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faBars,
  faBell,
  faChartBar,
  faChartLine,
  faChevronDown,
  faCogs,
  faFileLines,
  faLifeRing,
  faPlus,
  faSearch,
  faTimes,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Overview from "@components/admin/dashboard/Overview";
import AllBlogs from "@components/admin/dashboard/AllBlogs";
import BlogCreation from "@components/admin/dashboard/Blogcreation";

const dashboardNavigation = [
  { id: "overview", label: "Overview", icon: faChartLine },
  { id: "create", label: "Blog Creation", icon: faPlus },
  { id: "blogs", label: "All Blogs", icon: faFileLines },
];

const navigation = [
  { id: "users", label: "Users", icon: faUsers },
  { id: "settings", label: "Settings", icon: faCogs },
  { id: "reports", label: "Reports", icon: faChartBar },
  { id: "notifications", label: "Notifications", icon: faBell },
  { id: "help", label: "Help Center", icon: faLifeRing },
];

const AdminSection = ({ title, description, detail }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
    <p className="mt-2 text-slate-600">{description}</p>
    <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-950">
      {detail}
    </p>
  </section>
);

const AdminPanel = ({ authKey }) => {
  const [activeView, setActiveView] = useState("overview");
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [inputKey, setInputKey] = useState("");
  const [keyError, setKeyError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(true);

  const handleDbKeySubmit = (event) => {
    event.preventDefault();

    if (!authKey) {
      setKeyError("Admin access is not configured. Set DB_KEY in the server environment.");
      return;
    }

    if (inputKey !== authKey) {
      setKeyError("That key did not match. Please try again.");
      return;
    }

    setKeyError("");
    setShowAdminPanel(true);
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    setIsSidebarOpen(false);
  };

  const activeNavigation = [...dashboardNavigation, ...navigation].find(
    (item) => item.id === activeView
  );

  const renderActiveView = () => {
    if (activeView === "create") return <BlogCreation />;
    if (activeView === "blogs") return <AllBlogs searchQuery={searchQuery} />;
    if (activeView === "reports") {
      return (
        <section aria-labelledby="reports-heading">
          <div className="mb-6">
            <h2 id="reports-heading" className="text-2xl font-bold text-slate-900">
              Reports and analytics
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Website activity currently recorded by HelpOps Hub.
            </p>
          </div>
          <Overview />
          <p className="mt-6 rounded-xl border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm leading-6 text-cyan-950">
            These charts use HelpOps Hub&apos;s own account and blog data. Google
            Analytics 4 reports are not connected in this project yet.
          </p>
        </section>
      );
    }
    if (activeView === "users") {
      return (
        <AdminSection
          title="Users"
          description="The Users menu is restored. A privacy-safe user management screen is not currently implemented."
          detail="The existing users endpoint returns private account fields, so this page does not expose that data in the admin dashboard."
        />
      );
    }
    if (activeView === "settings") {
      return (
        <AdminSection
          title="Settings"
          description="Admin panel settings"
          detail="There are no editable admin settings connected to this page yet. To lock the dashboard, use the Lock admin panel button in the sidebar."
        />
      );
    }
    if (activeView === "notifications") {
      return (
        <AdminSection
          title="Notifications"
          description="Notifications menu"
          detail="The current notification API is scoped to individual users. An admin-wide notification inbox is not implemented yet."
        />
      );
    }
    if (activeView === "help") {
      return (
        <AdminSection
          title="Help Center"
          description="Help with the admin dashboard"
          detail="Use Overview for blog and community activity, Blog Creation to publish a post, and All Blogs to review or remove posts."
        />
      );
    }
    return <Overview />;
  };

  if (!showAdminPanel) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
        <section className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-7 shadow-xl sm:p-10">
          <div className="mb-6 flex items-center gap-3">
            <Image
              src="/HelpOps-H Fevicon.webp"
              alt="HelpOps Hub"
              width={48}
              height={48}
              priority
              draggable={false}
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-700">
                HelpOps Hub
              </p>
              <h1 className="text-2xl font-bold text-slate-900">Admin access</h1>
            </div>
          </div>
          <p className="mb-6 text-sm leading-6 text-slate-600">
            Enter your admin key to open the dashboard.
          </p>
          <form onSubmit={handleDbKeySubmit} className="space-y-4">
            <label htmlFor="dbKeyInput" className="block text-sm font-medium text-slate-700">
              Admin key
            </label>
            <input
              type="password"
              id="dbKeyInput"
              value={inputKey}
              onChange={(event) => {
                setInputKey(event.target.value);
                setKeyError("");
              }}
              placeholder="Enter your admin key"
              autoComplete="current-password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-600 focus:ring-2 focus:ring-cyan-100"
            />
            {keyError && (
              <p role="alert" className="text-sm text-rose-700">
                {keyError}
              </p>
            )}
            <button
              type="submit"
              className="w-full rounded-lg bg-slate-900 px-4 py-3 font-semibold text-white transition hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:ring-offset-2"
            >
              Continue
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-950/50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-slate-900 text-white shadow-xl transition-transform duration-200 md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex min-h-20 items-center justify-between border-b border-white/10 px-5">
          <div className="flex min-w-0 items-center gap-3">
            <Image
              src="/HelpOps-H Fevicon.webp"
              alt=""
              width={40}
              height={40}
              priority
              draggable={false}
              className="shrink-0 rounded-lg"
            />
            <span className="truncate text-lg font-bold tracking-tight">HelpOps Hub</span>
          </div>
          <button
            type="button"
            aria-label="Close navigation"
            className="rounded-lg p-2 text-slate-300 hover:bg-white/10 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <nav aria-label="Admin navigation" className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Workspace
          </p>
          <button
            type="button"
            onClick={() => setIsDashboardOpen((isOpen) => !isOpen)}
            aria-expanded={isDashboardOpen}
            className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white"
          >
            <span className="flex items-center gap-3">
              <FontAwesomeIcon icon={faChartLine} className="w-5" />
              Dashboard
            </span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transition-transform ${isDashboardOpen ? "rotate-180" : ""}`}
            />
          </button>
          {isDashboardOpen && (
            <div className="ml-4 space-y-1 border-l border-white/15 pl-3">
              {dashboardNavigation.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleViewChange(item.id)}
                  aria-current={activeView === item.id ? "page" : undefined}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                    activeView === item.id
                      ? "bg-cyan-700 font-medium text-white"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-4" />
                  {item.label}
                </button>
              ))}
            </div>
          )}
          <div className="my-4 border-t border-white/10" />
          {navigation.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleViewChange(item.id)}
              aria-current={activeView === item.id ? "page" : undefined}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                activeView === item.id
                  ? "bg-cyan-700 text-white shadow-lg shadow-cyan-950/20"
                  : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="w-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
            onClick={() => {
              setShowAdminPanel(false);
              setInputKey("");
              setSearchQuery("");
              setActiveView("overview");
            }}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <FontAwesomeIcon icon={faArrowRightFromBracket} className="w-5" />
            Lock admin panel
          </button>
        </div>
      </aside>

      <div className="min-h-screen md:ml-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
          <div className="flex min-h-20 items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <button
              type="button"
              aria-label="Open navigation"
              className="rounded-lg border border-slate-200 p-2 text-slate-700 hover:bg-slate-100 md:hidden"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                {activeNavigation?.label || "Admin"}
              </h1>
              <p className="hidden text-sm text-slate-500 sm:block">
                Manage HelpOps Hub content and activity.
              </p>
            </div>
            <label className="relative hidden w-full max-w-sm sm:block">
              <span className="sr-only">Search blog posts</span>
              <FontAwesomeIcon
                icon={faSearch}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  if (event.target.value) setActiveView("blogs");
                }}
                onFocus={() => {
                  if (searchQuery) setActiveView("blogs");
                }}
                placeholder="Search blog posts..."
                className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-cyan-600 focus:bg-white focus:ring-2 focus:ring-cyan-100"
              />
            </label>
          </div>
          <label className="relative block px-4 pb-3 sm:hidden">
            <span className="sr-only">Search blog posts</span>
            <FontAwesomeIcon
              icon={faSearch}
              className="pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
                if (event.target.value) setActiveView("blogs");
              }}
              onFocus={() => {
                if (searchQuery) setActiveView("blogs");
              }}
              placeholder="Search blog posts..."
              className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-cyan-600 focus:bg-white focus:ring-2 focus:ring-cyan-100"
            />
          </label>
        </header>

        <main className="mx-auto w-full max-w-7xl p-4 sm:p-6 lg:p-8">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
