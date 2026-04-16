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
            className={`relative flex min-h-[390px] items-center justify-center rounded-3xl border p-5 shadow-2xl overflow-hidden ${
              theme
                ? "bg-white/70 border-slate-200"
                : "bg-[#1f242c]/75 border-white/10"
            } backdrop-blur-xl`}
          >
            <div
              className={`absolute inset-0 opacity-60 pointer-events-none ${
                theme
                  ? "bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_38%)]"
                  : "bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_38%)]"
              }`}
            ></div>

            <img
              src={theme ? "/problem.webp" : "/problem%20dark%20mode.webp"}
              alt="DevOps problem illustration"
              className="relative z-10 w-full max-w-[560px] rounded-2xl object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)]"
              draggable="false"
            />
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
