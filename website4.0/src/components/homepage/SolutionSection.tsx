import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { homepageIcons, solutionPoints } from "@/data/homepage";
import type { SolutionSectionProps } from "@/types/homepage";

export function SolutionSection({
  theme = true,
  startLearningHref = "/devopsforum",
}: SolutionSectionProps) {
  return (
    <section
      className={`relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16 ${
        theme
          ? "bg-gradient-to-b from-[#eef7ff] via-[#eafaf5] to-[#f8fffd]"
          : "bg-gradient-to-b from-[#0f1722] via-[#0d1c1c] to-[#0e151e]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(56, 189, 248, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      <div
        className={`absolute -top-16 -left-20 h-80 w-80 rounded-full blur-3xl ${
          theme ? "bg-cyan-200/50" : "bg-cyan-500/20"
        }`}
      />
      <div
        className={`absolute -right-12 -bottom-20 h-96 w-96 rounded-full blur-3xl ${
          theme ? "bg-emerald-200/50" : "bg-emerald-500/15"
        }`}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 xl:grid-cols-2 xl:gap-14">
        <div data-aos="fade-up">
          <h2
            className={`text-4xl leading-tight font-extrabold md:text-5xl ${
              theme ? "text-[#122336]" : "text-white"
            }`}
          >
            Your One-Stop DevOps{" "}
            <span className="text-cyan-500">Solution</span> Hub
          </h2>
          <p
            className={`mt-5 max-w-2xl text-lg leading-relaxed md:text-xl ${
              theme ? "text-slate-600" : "text-slate-300"
            }`}
          >
            Stop wasting hours debugging. Get{" "}
            <span className="font-semibold text-emerald-500">Instant</span>{" "}
            solutions, learn{" "}
            <span className="font-semibold text-cyan-500">Faster</span>, and
            collaborate with a powerful DevOps{" "}
            <span className="font-semibold text-sky-500">Community</span>.
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
                    className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${
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
                      className={`mt-1 text-sm leading-relaxed ${
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
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30 active:scale-95"
          >
            <FontAwesomeIcon icon={homepageIcons.bolt} width={14} />
            Start Learning
          </Link>
        </div>

        <div
          className="relative min-h-[430px]"
          data-aos="fade-left"
          data-aos-delay="220"
        >
          <div
            className={`relative flex min-h-[430px] items-center justify-center overflow-hidden rounded-3xl border p-5 shadow-2xl backdrop-blur-xl ${
              theme
                ? "bg-white/75 border-slate-200"
                : "bg-[#14202a]/80 border-white/10"
            }`}
          >
            <Image
              src={theme ? "/solution.webp" : "/solution dark mode.webp"}
              alt="DevOps solution illustration"
              width={560}
              height={430}
              className="relative z-10 w-full max-w-[560px] rounded-2xl object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)]"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
