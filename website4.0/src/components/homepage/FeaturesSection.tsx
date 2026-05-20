import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { featureCards, homepageIcons } from "@/data/homepage";
import type { FeaturesSectionProps } from "@/types/homepage";

export function FeaturesSection({
  theme = true,
  exploreFeaturesHref = "/resources",
}: FeaturesSectionProps) {
  return (
    <section
      id="features"
      className={`relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16 ${
        theme
          ? "bg-gradient-to-b from-[#f8fcff] via-[#f7fbff] to-[#f1f9f7]"
          : "bg-gradient-to-b from-[#101926] via-[#0f1b22] to-[#0f171f]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.10), transparent 40%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.10), transparent 42%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center" data-aos="fade-up">
          <h2
            className={`text-4xl leading-tight font-extrabold md:text-5xl ${
              theme ? "text-[#122336]" : "text-white"
            }`}
          >
            What You Can Do with HelpOps-Hub
          </h2>
          <p
            className={`mx-auto mt-5 max-w-3xl text-lg leading-relaxed md:text-xl ${
              theme ? "text-slate-600" : "text-slate-300"
            }`}
          >
            Powerful features designed to simplify your DevOps journey and boost
            productivity.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature, index) => (
            <div
              key={feature.title}
              data-aos="fade-up"
              data-aos-delay={100 + index * 70}
              className={`group relative rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] ${
                theme
                  ? "bg-white/90 border-slate-200 shadow-sm hover:border-cyan-300/80 hover:shadow-xl hover:shadow-cyan-500/20"
                  : "bg-white/5 border-white/10 shadow-sm hover:border-cyan-300/80 hover:shadow-xl hover:shadow-cyan-500/15"
              }`}
            >
              {feature.isPopular ? (
                <span className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white uppercase">
                  Most Popular
                </span>
              ) : null}

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${
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

        <div
          className="mt-10 flex justify-center"
          data-aos="fade-up"
          data-aos-delay="220"
        >
          <Link
            href={exploreFeaturesHref}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-emerald-500 px-7 py-3 font-semibold text-white shadow-lg shadow-sky-500/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/30 active:scale-95"
          >
            <FontAwesomeIcon icon={homepageIcons.wandMagicSparkles} width={14} />
            Explore Features
          </Link>
        </div>
      </div>
    </section>
  );
}
