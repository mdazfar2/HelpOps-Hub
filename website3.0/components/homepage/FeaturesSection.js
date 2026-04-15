import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faBookOpen,
  faUsers,
  faMagnifyingGlass,
  faCodeFork,
  faScrewdriverWrench,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

const featureCards = [
  {
    icon: faBolt,
    title: "Fix DevOps Errors Instantly",
    description:
      "Access ready-made solutions for common issues in Docker, Kubernetes, CI/CD, and more.",
    isPopular: true,
  },
  {
    icon: faBookOpen,
    title: "Explore Learning Resources",
    description:
      "Read structured blogs and guides to improve your DevOps and cloud skills.",
  },
  {
    icon: faUsers,
    title: "Ask & Get Help from Community",
    description:
      "Post your issues and get solutions from experienced developers.",
  },
  {
    icon: faMagnifyingGlass,
    title: "Smart Search for Issues",
    description:
      "Quickly find solutions by searching error messages or keywords.",
  },
  {
    icon: faCodeFork,
    title: "Contribute to Open Source",
    description:
      "Collaborate, contribute, and grow with the DevOps community.",
  },
  {
    icon: faScrewdriverWrench,
    title: "Real-World Problem Solving",
    description:
      "Learn by solving actual DevOps challenges faced by developers.",
  },
];

function FeaturesSection({ theme, exploreFeaturesHref = "/resources" }) {
  return (
    <section
      className={`relative px-6 sm:px-10 lg:px-16 py-20 overflow-hidden ${
        theme
          ? "bg-gradient-to-b from-[#f8fcff] via-[#f7fbff] to-[#f1f9f7]"
          : "bg-gradient-to-b from-[#101926] via-[#0f1b22] to-[#0f171f]"
      }`}
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.10), transparent 40%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.10), transparent 42%)",
        }}
      ></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center" data-aos="fade-up">
          <h2
            className={`text-4xl md:text-5xl font-extrabold leading-tight ${
              theme ? "text-[#122336]" : "text-white"
            }`}
          >
            What You Can Do with HelpOps-Hub
          </h2>
          <p
            className={`mt-5 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${
              theme ? "text-slate-600" : "text-slate-300"
            }`}
          >
            Powerful features designed to simplify your DevOps journey and boost productivity.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {featureCards.map((feature, index) => (
            <div
              key={feature.title}
              data-aos="fade-up"
              data-aos-delay={100 + index * 70}
              className={`group relative rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] ${
                theme
                  ? "bg-white/90 border-slate-200 shadow-sm hover:shadow-xl hover:border-cyan-300/80 hover:shadow-cyan-500/20"
                  : "bg-white/5 border-white/10 shadow-sm hover:shadow-xl hover:border-cyan-300/80 hover:shadow-cyan-500/15"
              }`}
            >
              {feature.isPopular && (
                <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white">
                  Most Popular
                </span>
              )}

              <div
                className={`h-11 w-11 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                  theme
                    ? "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-100"
                    : "bg-cyan-500/20 text-cyan-200 group-hover:bg-cyan-500/30"
                }`}
              >
                <FontAwesomeIcon
                  icon={feature.icon}
                  width={18}
                  className="group-hover:feature-icon-pulse"
                />
              </div>

              <h3
                className={`mt-4 text-xl font-semibold ${
                  theme ? "text-slate-800" : "text-slate-100"
                }`}
              >
                {feature.title}
              </h3>
              <p
                className={`mt-2 text-sm leading-relaxed ${
                  theme ? "text-slate-600" : "text-slate-300"
                }`}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center" data-aos="fade-up" data-aos-delay="220">
          <Link
            href={exploreFeaturesHref}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-sky-500 to-emerald-500 shadow-lg shadow-sky-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/30 active:scale-95"
          >
            <FontAwesomeIcon icon={faWandMagicSparkles} width={14} />
            Explore Features
          </Link>
        </div>
      </div>

      <style jsx>{`
        :global(.feature-icon-pulse) {
          animation: featureIconPulse 0.9s ease;
        }

        @keyframes featureIconPulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}

export default FeaturesSection;
