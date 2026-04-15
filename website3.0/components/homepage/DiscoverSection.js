import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpen,
  faLightbulb,
  faPenNib,
  faChartLine,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";

const highlights = [
  {
    icon: faBookOpen,
    title: "Explore DevOps Blogs",
    description:
      "Read high-quality blogs on Docker, Kubernetes, CI/CD, Cloud, and more.",
  },
  {
    icon: faLightbulb,
    title: "Learn from Real Experiences",
    description:
      "Gain insights from real-world problems and practical solutions shared by developers.",
  },
  {
    icon: faPenNib,
    title: "Create & Share Your Knowledge",
    description:
      "Write and publish your own blogs to help others and build your personal brand.",
  },
  {
    icon: faChartLine,
    title: "Stay Updated",
    description:
      "Keep up with the latest DevOps trends, tools, and best practices.",
  },
];

const blogPreviews = [
  {
    title: "Kubernetes CrashLoopBackOff: Practical Fix Guide",
    author: "By Aisha Khan",
    snippet: "A quick diagnostic checklist to identify and resolve recurring pod restarts.",
    tag: "Kubernetes",
  },
  {
    title: "CI/CD Pipeline Failures: 7 Root Causes",
    author: "By Aryan DevOps",
    snippet: "Learn the most common deployment blockers and how teams fix them fast.",
    tag: "CI/CD",
  },
  {
    title: "From Docker Errors to Stable Builds",
    author: "By Meera S.",
    snippet: "A field-tested method to reduce image build breaks and speed up feedback loops.",
    tag: "Docker",
  },
];

function DiscoverSection({ theme, startNowHref = "/blogs", writeBlogHref }) {
  return (
    <section
      className={`relative px-6 sm:px-10 lg:px-16 py-20 overflow-hidden ${
        theme
          ? "bg-gradient-to-b from-[#f4f8ff] via-[#f5fbff] to-[#f3fbf7]"
          : "bg-gradient-to-b from-[#10172a] via-[#111827] to-[#0f1f22]"
      }`}
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 15%, rgba(59,130,246,0.18), transparent 40%), radial-gradient(circle at 78% 85%, rgba(16,185,129,0.14), transparent 38%)",
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-14 items-start">
        <div data-aos="fade-up">
          <h2
            className={`text-4xl md:text-5xl font-extrabold leading-tight ${
              theme ? "text-[#122336]" : "text-white"
            }`}
          >
            <span className="text-sky-500">Discover</span>, <span className="text-violet-500">Learn</span> & <span className="text-emerald-500">Grow</span>
          </h2>

          <p
            className={`mt-5 text-lg md:text-xl leading-relaxed ${
              theme ? "text-slate-600" : "text-slate-300"
            }`}
          >
            Explore insightful DevOps blogs, learn from real-world experiences, and share your knowledge with the community.
          </p>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={110 + index * 70}
                className={`group rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] ${
                  theme
                    ? "bg-white/90 border-slate-200 hover:border-sky-300/80 hover:shadow-[0_0_24px_rgba(59,130,246,0.20)]"
                    : "bg-white/5 border-white/10 hover:border-sky-300/70 hover:shadow-[0_0_24px_rgba(59,130,246,0.18)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                      theme
                        ? "bg-sky-50 text-sky-600"
                        : "bg-sky-500/20 text-sky-200"
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} width={17} />
                  </span>
                  <div>
                    <h3 className={`font-semibold ${theme ? "text-slate-800" : "text-slate-100"}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm mt-1 leading-relaxed ${theme ? "text-slate-600" : "text-slate-300"}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={startNowHref}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-500 shadow-lg shadow-sky-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/30 active:scale-95"
            >
              Start Now
              <FontAwesomeIcon icon={faArrowTrendUp} width={14} />
            </Link>

            {writeBlogHref && (
              <Link
                href={writeBlogHref}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold border transition-all duration-300 hover:scale-105 active:scale-95 ${
                  theme
                    ? "bg-white text-slate-700 border-slate-300 hover:border-violet-400 hover:text-violet-600"
                    : "bg-white/5 text-slate-200 border-white/15 hover:border-violet-300/70 hover:text-violet-200"
                }`}
              >
                Write a Blog
              </Link>
            )}
          </div>
        </div>

        <div className="relative" data-aos="fade-left" data-aos-delay="200">
          <div className="grid gap-4">
            {blogPreviews.map((blog, index) => (
              <article
                key={blog.title}
                data-aos="fade-up"
                data-aos-delay={160 + index * 90}
                className={`group rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] ${
                  theme
                    ? "bg-white/90 border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-300/70"
                    : "bg-white/5 border-white/10 shadow-sm hover:shadow-xl hover:border-emerald-300/60"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${theme ? "bg-sky-100 text-sky-700" : "bg-sky-500/20 text-sky-200"}`}>
                    {blog.tag}
                  </span>
                  <span className={`text-xs ${theme ? "text-slate-500" : "text-slate-400"}`}>{blog.author}</span>
                </div>

                <h3 className={`mt-3 text-lg font-semibold leading-snug ${theme ? "text-slate-800" : "text-slate-100"}`}>
                  {blog.title}
                </h3>
                <p className={`mt-2 text-sm leading-relaxed ${theme ? "text-slate-600" : "text-slate-300"}`}>
                  {blog.snippet}
                </p>

                <div className="mt-4 h-1.5 rounded-full bg-slate-200/60 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-emerald-500"
                    style={{ width: `${70 + index * 10}%` }}
                  ></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiscoverSection;
