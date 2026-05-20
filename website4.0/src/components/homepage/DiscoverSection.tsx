import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { blogPreviews, highlights, homepageIcons } from "@/data/homepage";
import type { DiscoverSectionProps } from "@/types/homepage";

export function DiscoverSection({
  theme = true,
  startNowHref = "/blogs",
  writeBlogHref,
}: DiscoverSectionProps) {
  return (
    <section
      className={`relative overflow-hidden px-6 py-20 sm:px-10 lg:px-16 ${
        theme
          ? "bg-gradient-to-b from-[#f4f8ff] via-[#f5fbff] to-[#f3fbf7]"
          : "bg-gradient-to-b from-[#10172a] via-[#111827] to-[#0f1f22]"
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 15%, rgba(59,130,246,0.18), transparent 40%), radial-gradient(circle at 78% 85%, rgba(16,185,129,0.14), transparent 38%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-start gap-10 xl:grid-cols-2 xl:gap-14">
        <div data-aos="fade-up">
          <h2
            className={`text-4xl leading-tight font-extrabold md:text-5xl ${
              theme ? "text-[#122336]" : "text-white"
            }`}
          >
            <span className="text-sky-500">Discover</span>,{" "}
            <span className="text-violet-500">Learn</span> &{" "}
            <span className="text-emerald-500">Grow</span>
          </h2>

          <p
            className={`mt-5 text-lg leading-relaxed md:text-xl ${
              theme ? "text-slate-600" : "text-slate-300"
            }`}
          >
            Explore insightful DevOps blogs, learn from real-world experiences,
            and share your knowledge with the community.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={110 + index * 70}
                className={`group rounded-2xl border p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] ${
                  theme
                    ? "bg-white/90 border-slate-200 hover:border-sky-300/80 hover:shadow-[0_0_24px_rgba(59,130,246,0.20)]"
                    : "bg-white/5 border-white/10 hover:border-sky-300/70 hover:shadow-[0_0_24px_rgba(59,130,246,0.18)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 ${
                      theme
                        ? "bg-sky-50 text-sky-600"
                        : "bg-sky-500/20 text-sky-200"
                    }`}
                  >
                    <FontAwesomeIcon icon={item.icon} width={17} />
                  </span>
                  <div>
                    <h3
                      className={`font-semibold ${
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
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={startNowHref}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 via-violet-500 to-emerald-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/30 active:scale-95"
            >
              Start Now
              <FontAwesomeIcon icon={homepageIcons.arrowTrendUp} width={14} />
            </Link>

            {writeBlogHref ? (
              <Link
                href={writeBlogHref}
                className={`inline-flex items-center gap-2 rounded-xl border px-6 py-3.5 font-semibold transition-all duration-300 hover:scale-105 active:scale-95 ${
                  theme
                    ? "bg-white text-slate-700 border-slate-300 hover:border-violet-400 hover:text-violet-600"
                    : "bg-white/5 text-slate-200 border-white/15 hover:border-violet-300/70 hover:text-violet-200"
                }`}
              >
                Write a Blog
              </Link>
            ) : null}
          </div>
        </div>

        <div className="relative" data-aos="fade-left" data-aos-delay="200">
          <div className="grid gap-4">
            {blogPreviews.map((blog, index) => (
              <article
                key={blog.title}
                data-aos="fade-up"
                data-aos-delay={160 + index * 90}
                className={`group rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] ${
                  theme
                    ? "bg-white/90 border-slate-200 shadow-sm hover:border-emerald-300/70 hover:shadow-xl"
                    : "bg-white/5 border-white/10 shadow-sm hover:border-emerald-300/60 hover:shadow-xl"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      theme
                        ? "bg-sky-100 text-sky-700"
                        : "bg-sky-500/20 text-sky-200"
                    }`}
                  >
                    {blog.tag}
                  </span>
                  <span
                    className={`text-xs ${
                      theme ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {blog.author}
                  </span>
                </div>

                <h3
                  className={`mt-3 text-lg leading-snug font-semibold ${
                    theme ? "text-slate-800" : "text-slate-100"
                  }`}
                >
                  {blog.title}
                </h3>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    theme ? "text-slate-600" : "text-slate-300"
                  }`}
                >
                  {blog.snippet}
                </p>

                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200/60">
                  <div
                    className="h-full bg-gradient-to-r from-sky-500 to-emerald-500"
                    style={{ width: `${70 + index * 10}%` }}
                  />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
