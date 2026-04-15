import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBug,
  faCloud,
  faClock,
  faTriangleExclamation,
  faCodeBranch,
  faSliders,
} from "@fortawesome/free-solid-svg-icons";

const floatAnimation = {
  animation: "problemFloat 5.5s ease-in-out infinite",
};

const floatDelayOne = {
  ...floatAnimation,
  animationDelay: "0.5s",
};

const floatDelayTwo = {
  ...floatAnimation,
  animationDelay: "1.1s",
};

const buildLogAnimation = (delay) => ({
  opacity: 0,
  transform: "translateY(6px)",
  animation: `logReveal 0.8s ease ${delay}s forwards`,
});

const problemPoints = [
  {
    icon: faBug,
    text: "Frequent Docker build and runtime errors",
  },
  {
    icon: faCloud,
    text: "Kubernetes pods crashing without clear logs",
  },
  {
    icon: faCodeBranch,
    text: "CI/CD pipelines failing unexpectedly",
  },
  {
    icon: faSliders,
    text: "Configuration issues across environments",
  },
  {
    icon: faClock,
    text: "Debugging takes too much time",
  },
  {
    icon: faTriangleExclamation,
    text: "Lack of clear, centralized solutions",
  },
];

function ProblemSection({ theme }) {
  return (
    <section
      className={`relative px-6 sm:px-10 lg:px-16 py-20 overflow-hidden ${
        theme
          ? "bg-gradient-to-b from-[#f5f7fb] via-[#ecf3f7] to-[#f7f7f8]"
          : "bg-gradient-to-b from-[#181a1f] via-[#15181d] to-[#111315]"
      }`}
    >
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.10) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      ></div>
      <div
        className={`absolute -top-10 -left-24 w-80 h-80 rounded-full blur-3xl ${
          theme ? "bg-red-300/40" : "bg-red-500/20"
        }`}
      ></div>
      <div
        className={`absolute -bottom-20 -right-12 w-96 h-96 rounded-full blur-3xl ${
          theme ? "bg-orange-300/30" : "bg-orange-500/15"
        }`}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 xl:grid-cols-2 gap-10 xl:gap-14 items-center">
        <div data-aos="fade-up">
          <h2
            className={`text-4xl md:text-5xl font-extrabold leading-tight ${
              theme ? "text-[#1f2a37]" : "text-white"
            }`}
          >
            Struggling with DevOps <span className="text-[#ef5e5e]">Errors</span>?
          </h2>
          <p
            className={`mt-5 text-lg md:text-xl leading-relaxed max-w-2xl ${
              theme ? "text-slate-600" : "text-slate-300"
            }`}
          >
            From Docker crashes to Kubernetes <span className="text-[#f97316] font-semibold">Failures</span>, DevOps issues can slow you down and waste valuable <span className="text-[#ef5e5e] font-semibold">Time</span>.
          </p>

          <div className="mt-9 grid sm:grid-cols-2 gap-4">
            {problemPoints.map((point, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={100 + index * 70}
                className={`group rounded-2xl border p-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] ${
                  theme
                    ? "bg-white/85 border-slate-200 hover:border-red-400/70 hover:shadow-[0_0_26px_rgba(248,113,113,0.28)]"
                    : "bg-white/5 border-white/10 hover:border-red-300/70 hover:shadow-[0_0_30px_rgba(248,113,113,0.24)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`h-10 w-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                      theme
                        ? "bg-[#ffe4e4] text-[#d94848] group-hover:bg-[#ffd0d0]"
                        : "bg-red-500/20 text-red-200 group-hover:bg-red-500/30"
                    }`}
                  >
                    <FontAwesomeIcon icon={point.icon} width={18} />
                  </span>
                  <p
                    className={`text-sm md:text-[15px] leading-snug font-medium ${
                      theme ? "text-slate-700" : "text-slate-100"
                    }`}
                  >
                    {point.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="relative min-h-[390px]"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <div
            className={`relative rounded-3xl border p-6 shadow-2xl overflow-hidden ${
              theme
                ? "bg-white/70 border-slate-200"
                : "bg-[#1f242c]/75 border-white/10"
            } backdrop-blur-xl`}
          >
            <div
              className={`flex items-center justify-between pb-4 border-b ${
                theme ? "border-slate-200" : "border-white/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-green-400"></span>
              </div>
              <span
                className={`text-xs font-semibold tracking-wider ${
                  theme ? "text-slate-500" : "text-slate-300"
                }`}
              >
                incident.log
              </span>
            </div>

            <div className="mt-5 space-y-3 font-mono text-sm">
              <div style={buildLogAnimation(0.2)} className="text-red-400">
                [ERROR] Docker build failed: missing layer checksum
              </div>
              <div style={buildLogAnimation(0.45)} className="text-orange-400">
                [WARN] Pod restart loop detected in production cluster
              </div>
              <div style={buildLogAnimation(0.7)} className="text-amber-300">
                [ALERT] Pipeline blocked: integration tests timeout
              </div>
              <div
                style={buildLogAnimation(0.95)}
                className={theme ? "text-slate-700" : "text-slate-300"}
              >
                [INFO] Retrying deploy with fallback configuration
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div
                className={`rounded-xl px-3 py-2 text-sm border ${
                  theme
                    ? "bg-[#fff3f2] border-red-200 text-red-600"
                    : "bg-red-500/10 border-red-400/30 text-red-200"
                }`}
              >
                17 Active Failures
              </div>
              <div
                className={`rounded-xl px-3 py-2 text-sm border ${
                  theme
                    ? "bg-[#fff7ed] border-orange-200 text-orange-600"
                    : "bg-orange-500/10 border-orange-400/30 text-orange-200"
                }`}
              >
                4 Broken Pipelines
              </div>
            </div>
          </div>

          <div
            style={floatDelayOne}
            className={`absolute -left-4 top-12 rounded-xl border px-4 py-3 shadow-lg ${
              theme
                ? "bg-white border-red-200 text-red-600"
                : "bg-[#282c34] border-red-300/40 text-red-200"
            }`}
          >
            <div className="text-xs uppercase tracking-wider opacity-80">Cluster Alert</div>
            <div className="font-semibold text-sm">Pod CrashLoopBackOff</div>
          </div>

          <div
            style={floatDelayTwo}
            className={`absolute -right-3 bottom-8 rounded-xl border px-4 py-3 shadow-lg ${
              theme
                ? "bg-white border-orange-200 text-orange-600"
                : "bg-[#282c34] border-orange-300/40 text-orange-200"
            }`}
          >
            <div className="text-xs uppercase tracking-wider opacity-80">Pipeline</div>
            <div className="font-semibold text-sm">Stage 4 Failed</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes problemFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes logReveal {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

export default ProblemSection;
