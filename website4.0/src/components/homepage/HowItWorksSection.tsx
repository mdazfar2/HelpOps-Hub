import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { homepageIcons, steps } from "@/data/homepage";
import type { HowItWorksSectionProps } from "@/types/homepage";

export function HowItWorksSection({
  theme = true,
  tryItNowHref = "/devopsforum",
}: HowItWorksSectionProps) {
  return (
    <section
      id="how-it-works"
      className={`relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16 ${
        theme
          ? "bg-gradient-to-b from-[#f2fbff] via-[#f7fcff] to-[#f6fff9]"
          : "bg-gradient-to-b from-[#0f1622] via-[#101b27] to-[#0f1b22]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(130deg, rgba(34,211,238,0.14), transparent 35%), linear-gradient(320deg, rgba(16,185,129,0.14), transparent 35%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center" data-aos="fade-up">
          <h2
            className={`text-4xl leading-tight font-extrabold md:text-5xl ${
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
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-7">
            {steps.map((step, index) => (
              <div
                key={step.number}
                data-aos="fade-up"
                data-aos-delay={120 + index * 100}
                className={`group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] ${
                  theme
                    ? "bg-white/90 border-slate-200 shadow-sm hover:border-cyan-300/80 hover:shadow-xl hover:shadow-cyan-500/20"
                    : "bg-white/5 border-white/10 shadow-sm hover:border-cyan-300/70 hover:shadow-xl hover:shadow-cyan-500/15"
                }`}
              >
                <span className="text-xs font-semibold tracking-[0.25em] text-slate-400">
                  {step.number}
                </span>

                <div
                  className={`mt-3 flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${
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

                {index < steps.length - 1 ? (
                  <div className="absolute top-[5.15rem] -right-4 hidden h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-lg lg:flex">
                    <FontAwesomeIcon icon={homepageIcons.arrowRight} width={12} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-10 flex justify-center"
          data-aos="fade-up"
          data-aos-delay="220"
        >
          <Link
            href={tryItNowHref}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-8 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
          >
            <FontAwesomeIcon icon={homepageIcons.rocket} width={14} />
            Try It Now
          </Link>
        </div>
      </div>
    </section>
  );
}
