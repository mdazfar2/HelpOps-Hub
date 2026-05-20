import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { problemPoints } from "@/data/homepage";
import type { ThemedSectionProps } from "@/types/homepage";

export function ProblemSection({ theme = true }: ThemedSectionProps) {
  return (
    <section
      className={`relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16 ${
        theme
          ? "bg-gradient-to-b from-[#f5f7fb] via-[#ecf3f7] to-[#f7f7f8]"
          : "bg-gradient-to-b from-[#181a1f] via-[#15181d] to-[#111315]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(148, 163, 184, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.10) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div
        className={`absolute -top-10 -left-24 h-80 w-80 rounded-full blur-3xl ${
          theme ? "bg-red-300/40" : "bg-red-500/20"
        }`}
      />
      <div
        className={`absolute -right-12 -bottom-20 h-96 w-96 rounded-full blur-3xl ${
          theme ? "bg-orange-300/30" : "bg-orange-500/15"
        }`}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 xl:grid-cols-2 xl:gap-14">
        <div data-aos="fade-up">
          <h2
            className={`text-4xl leading-tight font-extrabold md:text-5xl ${
              theme ? "text-[#1f2a37]" : "text-white"
            }`}
          >
            Struggling with DevOps <span className="text-[#ef5e5e]">Errors</span>
            ?
          </h2>
          <p
            className={`mt-5 max-w-2xl text-lg leading-relaxed md:text-xl ${
              theme ? "text-slate-600" : "text-slate-300"
            }`}
          >
            From Docker crashes to Kubernetes{" "}
            <span className="font-semibold text-[#f97316]">Failures</span>,
            DevOps issues can slow you down and waste valuable{" "}
            <span className="font-semibold text-[#ef5e5e]">Time</span>.
          </p>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {problemPoints.map((point, index) => (
              <div
                key={point.text}
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
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-300 ${
                      theme
                        ? "bg-[#ffe4e4] text-[#d94848] group-hover:bg-[#ffd0d0]"
                        : "bg-red-500/20 text-red-200 group-hover:bg-red-500/30"
                    }`}
                  >
                    <FontAwesomeIcon icon={point.icon} width={18} />
                  </span>
                  <p
                    className={`text-sm leading-snug font-medium md:text-[15px] ${
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
            className={`relative flex min-h-[390px] items-center justify-center overflow-hidden rounded-3xl border p-5 shadow-2xl backdrop-blur-xl ${
              theme
                ? "bg-white/70 border-slate-200"
                : "bg-[#1f242c]/75 border-white/10"
            }`}
          >
            <div
              className={`pointer-events-none absolute inset-0 opacity-60 ${
                theme
                  ? "bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.14),transparent_38%)]"
                  : "bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_38%)]"
              }`}
            />

            <Image
              src={theme ? "/problem.webp" : "/problem dark mode.webp"}
              alt="DevOps problem illustration"
              width={560}
              height={390}
              className="relative z-10 w-full max-w-[560px] rounded-2xl object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.18)]"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
