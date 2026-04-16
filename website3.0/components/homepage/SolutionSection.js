import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faBolt,
  faUsers,
  faMagnifyingGlass,
  faCodeFork,
  faSparkles,
} from "@fortawesome/free-solid-svg-icons";

const solutionPoints = [
  {
    icon: faCircleCheck,
    title: "Ready-to-use fixes",
    text: "Get proven solutions for common DevOps errors without trial-and-error.",
  },
  {
    icon: faUsers,
    title: "Community Q&A support",
    text: "Ask questions and receive real-time help from experienced practitioners.",
  },
  {
    icon: faSparkles,
    title: "Structured learning",
    text: "Explore practical blogs and guided resources to upskill faster.",
  },
  {
    icon: faMagnifyingGlass,
    title: "Instant error discovery",
    text: "Search exact issue patterns and find working fixes in seconds.",
  },
  {
    icon: faCodeFork,
    title: "Open-source collaboration",
    text: "Contribute, improve solutions, and grow with a DevOps-first ecosystem.",
  },
];

function SolutionSection({ theme, startLearningHref = "/devopsforum" }) {
  return (
    <section
      className={`relative px-6 sm:px-10 lg:px-16 py-20 overflow-hidden ${
        theme
          ? "bg-gradient-to-b from-[#eef7ff] via-[#eafaf5] to-[#f8fffd]"
          : "bg-gradient-to-b from-[#0f1722] via-[#0d1c1c] to-[#0e151e]"
      }`}
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      ></div>
      <div
        className={`absolute -top-16 -left-20 w-80 h-80 rounded-full blur-3xl ${
          theme ? "bg-cyan-200/50" : "bg-cyan-500/20"
        }`}
      ></div>
      <div
        className={`absolute -bottom-20 -right-12 w-96 h-96 rounded-full blur-3xl ${
          theme ? "bg-emerald-200/50" : "bg-emerald-500/15"
        }`}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-14 items-center">
        <div data-aos="fade-up">
          <h2
            className={`text-4xl md:text-5xl font-extrabold leading-tight ${
              theme ? "text-[#122336]" : "text-white"
            }`}
          >
            Your One-Stop DevOps <span className="text-cyan-500">Solution</span> Hub
          </h2>
          <p
            className={`mt-5 text-lg md:text-xl leading-relaxed max-w-2xl ${
              theme ? "text-slate-600" : "text-slate-300"
            }`}
          >
            Stop wasting hours debugging. Get <span className="font-semibold text-emerald-500">Instant</span> solutions, learn <span className="font-semibold text-cyan-500">Faster</span>, and collaborate with a powerful DevOps <span className="font-semibold text-sky-500">Community</span>.
          </p>

          <div className="mt-9 grid gap-4">
            {solutionPoints.map((item, index) => (
              <div
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={120 + index * 80}
                className={`group rounded-2xl border p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] ${
                  theme
                    ? "bg-white/85 border-slate-200 hover:border-cyan-400/80 hover:shadow-[0_0_24px_rgba(34,211,238,0.24)]"
                    : "bg-white/5 border-white/10 hover:border-cyan-300/80 hover:shadow-[0_0_28px_rgba(34,211,238,0.22)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`h-10 w-10 mt-0.5 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      theme
                        ? "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100"
                        : "bg-cyan-500/20 text-cyan-200 group-hover:bg-cyan-500/30"
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} width={18} />
                  </span>
                  <div>
                    <h3
                      className={`text-base font-semibold ${
                        theme ? "text-slate-800" : "text-slate-100"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={`text-sm mt-1 leading-relaxed ${
                        theme ? "text-slate-600" : "text-slate-300"
                      }`}
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link
            href={startLearningHref}
            className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
          >
            <FontAwesomeIcon icon={faBolt} width={14} />
            Start Learning
          </Link>
        </div>

        <div
          className="relative min-h-[430px]"
          data-aos="fade-left"
          data-aos-delay="220"
        >
          <div
            className={`relative flex min-h-[430px] items-center justify-center rounded-3xl border p-5 shadow-2xl overflow-hidden ${
              theme
                ? "bg-white/75 border-slate-200"
                : "bg-[#14202a]/80 border-white/10"
            } backdrop-blur-xl`}
          >
            <img
              src={theme ? "/solution.webp" : "/solution%20dark%20mode.webp"}
              alt="DevOps solution illustration"
              className="relative z-10 w-full max-w-[560px] rounded-2xl object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)]"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SolutionSection;
