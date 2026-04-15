import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBolt,
  faRocket,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const steps = [
  {
    number: "01",
    icon: faMagnifyingGlass,
    title: "Search or Ask Your Issue",
    description:
      "Enter your DevOps error or post your issue to get started.",
  },
  {
    number: "02",
    icon: faBolt,
    title: "Get Instant Solutions",
    description:
      "Discover ready-made fixes or get answers from the community.",
  },
  {
    number: "03",
    icon: faRocket,
    title: "Implement & Learn",
    description:
      "Apply the solution, fix your issue, and level up your skills.",
  },
];

function HowItWorksSection({ theme, tryItNowHref = "/devopsforum" }) {
  return (
    <section
      className={`relative px-6 sm:px-10 lg:px-16 py-20 overflow-hidden ${
        theme
          ? "bg-gradient-to-b from-[#f2fbff] via-[#f7fcff] to-[#f6fff9]"
          : "bg-gradient-to-b from-[#0f1622] via-[#101b27] to-[#0f1b22]"
      }`}
    >
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(130deg, rgba(34,211,238,0.14), transparent 35%), linear-gradient(320deg, rgba(16,185,129,0.14), transparent 35%)",
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center" data-aos="fade-up">
          <h2
            className={`text-4xl md:text-5xl font-extrabold leading-tight ${
              theme ? "text-[#122336]" : "text-white"
            }`}
          >
            How HelpOps-Hub Works
          </h2>
          <p
            className={`mt-4 text-lg md:text-xl ${
              theme ? "text-slate-600" : "text-slate-300"
            }`}
          >
            Solve DevOps issues in just a few simple steps.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="hidden lg:block absolute top-20 left-[17%] right-[17%] h-[2px] bg-gradient-to-r from-cyan-400/70 via-sky-400/70 to-emerald-400/70"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-7">
            {steps.map((step, index) => (
              <div
                key={step.number}
                data-aos="fade-up"
                data-aos-delay={120 + index * 100}
                className={`group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] ${
                  theme
                    ? "bg-white/90 border-slate-200 shadow-sm hover:shadow-xl hover:border-cyan-300/80 hover:shadow-cyan-500/20"
                    : "bg-white/5 border-white/10 shadow-sm hover:shadow-xl hover:border-cyan-300/70 hover:shadow-cyan-500/15"
                }`}
              >
                <span className={`text-xs font-semibold tracking-[0.25em] ${theme ? "text-slate-400" : "text-slate-400"}`}>
                  {step.number}
                </span>

                <div
                  className={`mt-3 h-12 w-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                    theme
                      ? "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100"
                      : "bg-cyan-500/20 text-cyan-200 group-hover:bg-cyan-500/30"
                  }`}
                >
                  <FontAwesomeIcon icon={step.icon} width={19} />
                </div>

                <h3
                  className={`mt-4 text-xl font-semibold ${
                    theme ? "text-slate-800" : "text-slate-100"
                  }`}
                >
                  {step.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    theme ? "text-slate-600" : "text-slate-300"
                  }`}
                >
                  {step.description}
                </p>

                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-4 top-[5.15rem] h-8 w-8 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white items-center justify-center shadow-lg">
                    <FontAwesomeIcon icon={faArrowRight} width={12} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center" data-aos="fade-up" data-aos-delay="220">
          <Link
            href={tryItNowHref}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-cyan-500 to-emerald-500 shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
          >
            <FontAwesomeIcon icon={faRocket} width={14} />
            Try It Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
