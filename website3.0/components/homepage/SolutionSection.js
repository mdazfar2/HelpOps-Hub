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
  faTerminal,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";

const floatAnimation = {
  animation: "solutionFloat 5.8s ease-in-out infinite",
};

const floatDelayOne = {
  ...floatAnimation,
  animationDelay: "0.4s",
};

const floatDelayTwo = {
  ...floatAnimation,
  animationDelay: "1.1s",
};

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
            className={`relative rounded-3xl border p-6 shadow-2xl overflow-hidden ${
              theme
                ? "bg-white/75 border-slate-200"
                : "bg-[#14202a]/80 border-white/10"
            } backdrop-blur-xl`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-400"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-sky-400"></span>
              </div>
              <span className={`text-xs font-semibold tracking-wider ${theme ? "text-slate-500" : "text-slate-300"}`}>
                helpops-dashboard
              </span>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className={`rounded-xl border p-3 ${theme ? "bg-cyan-50 border-cyan-100" : "bg-cyan-500/10 border-cyan-400/30"}`}>
                <div className={`text-xs ${theme ? "text-slate-600" : "text-slate-300"}`}>Resolved Issues</div>
                <div className="text-2xl font-bold text-cyan-500">1,248</div>
              </div>
              <div className={`rounded-xl border p-3 ${theme ? "bg-emerald-50 border-emerald-100" : "bg-emerald-500/10 border-emerald-400/30"}`}>
                <div className={`text-xs ${theme ? "text-slate-600" : "text-slate-300"}`}>Avg. Fix Time</div>
                <div className="text-2xl font-bold text-emerald-500">4m</div>
              </div>
            </div>

            <div className={`mt-5 rounded-2xl border p-4 ${theme ? "bg-white border-slate-200" : "bg-[#0f1722]/70 border-white/10"}`}>
              <div className="flex items-center justify-between">
                <div className={`text-sm font-semibold ${theme ? "text-slate-700" : "text-slate-200"}`}>
                  CI pipeline issue detected
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-500">Before</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-200/60 overflow-hidden">
                <div className="h-full w-[30%] bg-gradient-to-r from-amber-400 to-orange-400"></div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className={`text-sm font-semibold ${theme ? "text-slate-700" : "text-slate-200"}`}>
                  Fix applied from community answer
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-500">After</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-slate-200/60 overflow-hidden">
                <div className="h-full w-[96%] bg-gradient-to-r from-cyan-500 to-emerald-500"></div>
              </div>
            </div>

            <div className="mt-5 space-y-2 font-mono text-sm">
              <div className="text-emerald-500">[FIXED] Kubernetes probe timeout resolved</div>
              <div className="text-cyan-500">[MATCHED] 14 similar issues with verified solutions</div>
              <div className={theme ? "text-slate-700" : "text-slate-300"}>
                [SUCCESS] Deployment status: healthy and stable
              </div>
            </div>
          </div>

          <div
            style={floatDelayOne}
            className={`absolute -left-4 top-14 rounded-xl border px-4 py-3 shadow-lg ${
              theme
                ? "bg-white border-emerald-200 text-emerald-600"
                : "bg-[#1a2833] border-emerald-300/40 text-emerald-300"
            }`}
          >
            <div className="text-xs uppercase tracking-wider opacity-80">Success Rate</div>
            <div className="font-semibold text-sm">96.4% Resolved</div>
          </div>

          <div
            style={floatDelayTwo}
            className={`absolute -right-3 bottom-8 rounded-xl border px-4 py-3 shadow-lg ${
              theme
                ? "bg-white border-cyan-200 text-cyan-600"
                : "bg-[#1a2833] border-cyan-300/40 text-cyan-300"
            }`}
          >
            <div className="text-xs uppercase tracking-wider opacity-80">Community Help</div>
            <div className="font-semibold text-sm">24x7 Active Threads</div>
          </div>

          <div
            className={`absolute right-20 -top-6 h-12 w-12 rounded-xl border flex items-center justify-center ${
              theme ? "bg-white border-cyan-200 text-cyan-500" : "bg-[#1a2833] border-cyan-300/40 text-cyan-300"
            }`}
            style={floatAnimation}
          >
            <FontAwesomeIcon icon={faArrowTrendUp} width={18} />
          </div>

          <div
            className={`absolute left-24 -bottom-8 h-12 w-12 rounded-xl border flex items-center justify-center ${
              theme ? "bg-white border-emerald-200 text-emerald-500" : "bg-[#1a2833] border-emerald-300/40 text-emerald-300"
            }`}
            style={floatDelayOne}
          >
            <FontAwesomeIcon icon={faTerminal} width={18} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes solutionFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-9px);
          }
        }
      `}</style>
    </section>
  );
}

export default SolutionSection;
