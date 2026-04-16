import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutPage = ({ theme }) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const Section = ({ id, children, className = "" }) => {
    const [ref, inView] = useInView({
      triggerOnce: true,
      threshold: 0.1,
    });

    return (
      <motion.section
        id={id}
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={fadeInUp}
        className={`py-20 ${className}`}
      >
        {children}
      </motion.section>
    );
  };

  const StatCard = ({ value, label, suffix = "+" }) => {
    const [count, setCount] = useState(0);
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

    useEffect(() => {
      if (!inView) return;

      let start = 0;
      const duration = 1200;
      const step = value / (duration / 16);
      const interval = setInterval(() => {
        start += step;
        if (start >= value) {
          setCount(value);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(interval);
    }, [inView, value]);

    return (
      <div
        ref={ref}
        className={`rounded-2xl p-6 border shadow-lg transition-all duration-300 hover:-translate-y-1 ${
          theme
            ? "bg-white/90 border-slate-200"
            : "bg-[#252728]/90 border-[#3a3d3f]"
        }`}
      >
        <div className={`text-3xl font-extrabold ${theme ? "text-[#133c55]" : "text-cyan-300"}`}>
          {count}
          {suffix}
        </div>
        <div className={`${theme ? "text-slate-600" : "text-slate-300"} mt-2`}>{label}</div>
      </div>
    );
  };

  const offerCards = useMemo(
    () => [
      {
        icon: "🛠️",
        title: "DevOps Error Solutions",
        desc: "Get practical fixes for real deployment, CI/CD, Docker, and Kubernetes issues.",
      },
      {
        icon: "💬",
        title: "Community Q&A Support",
        desc: "Ask questions, share insights, and receive answers from builders who have been there.",
      },
      {
        icon: "📘",
        title: "Learning Blogs & Resources",
        desc: "Learn DevOps faster with concise guides, breakdowns, and implementation-first articles.",
      },
      {
        icon: "🌍",
        title: "Open Source Contributions",
        desc: "Contribute, collaborate, and build your public profile with community-driven impact.",
      },
    ],
    []
  );

  const choosePoints = useMemo(
    () => [
      "Saves hours of debugging time",
      "Real-world, implementation-focused solutions",
      "Community-driven knowledge sharing",
      "Beginner-friendly and scalable for advanced users",
    ],
    []
  );

  return (
    <div className={`w-full overflow-x-hidden ${theme ? "bg-[#f7fbff]" : "bg-[#1e1d1d]"}`}>
      {/* Hero Section */}
      <Section
        id="hero"
        className="h-[500px] md:h-screen flex items-center justify-center relative overflow-hidden"
      >
        <div className="absolute inset-0 z-0 flex items-center justify-center">
          <div className="w-9/12 h-[75%] relative mt-[135px] max-lg:w-3/4 max-md:w-full aspect-video">
            <video
              autoPlay
              loop
              muted
              className="object-cover w-auto h-auto md:w-full md:h-full"
            >
              <source src="/HelpOps-H.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </Section>

      {/* SECTION 1: Intro */}
      <Section id="intro" className="relative pt-24 pb-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute -top-12 left-0 w-80 h-80 rounded-full blur-3xl ${theme ? "bg-cyan-200/40" : "bg-cyan-500/10"}`}></div>
          <div className={`absolute right-0 top-20 w-80 h-80 rounded-full blur-3xl ${theme ? "bg-emerald-200/40" : "bg-emerald-500/10"}`}></div>
        </div>

        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className={`text-4xl md:text-5xl font-extrabold leading-tight ${theme ? "text-[#0e3550]" : "text-slate-100"}`}>
                Empowering Developers to Solve DevOps Challenges Faster
              </h1>
              <p className={`mt-5 text-lg leading-relaxed ${theme ? "text-slate-600" : "text-slate-300"}`}>
                HelpOps-Hub is built to simplify DevOps learning, solve real-world errors, and create a strong community of developers helping each other grow.
              </p>
            </div>

            <div
              className={`relative rounded-3xl border p-6 md:p-8 shadow-xl ${
                theme
                  ? "bg-white/80 border-slate-200"
                  : "bg-[#262a2d]/80 border-[#3c4146]"
              }`}
            >
              <div className="grid grid-cols-3 gap-3 mb-4">
                {["CI", "CD", "K8s", "IaC", "Cloud", "Logs"].map((chip) => (
                  <div
                    key={chip}
                    className={`text-xs md:text-sm text-center py-2 rounded-lg font-semibold ${
                      theme ? "bg-cyan-50 text-cyan-700" : "bg-cyan-500/20 text-cyan-200"
                    }`}
                  >
                    {chip}
                  </div>
                ))}
              </div>
              <div className={`rounded-2xl p-4 ${theme ? "bg-gradient-to-br from-sky-50 to-emerald-50" : "bg-gradient-to-br from-[#1d2632] to-[#17232c]"}`}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <div className={`h-2 flex-1 rounded ${theme ? "bg-slate-200" : "bg-slate-700"}`}></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className={`h-14 rounded-xl ${theme ? "bg-white shadow" : "bg-[#273544]"}`}></div>
                  <div className={`h-14 rounded-xl ${theme ? "bg-white shadow" : "bg-[#273544]"}`}></div>
                  <div className={`h-14 rounded-xl ${theme ? "bg-white shadow" : "bg-[#273544]"}`}></div>
                  <div className={`h-14 rounded-xl ${theme ? "bg-white shadow" : "bg-[#273544]"}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 2: Our Story */}
      <Section id="story" className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`rounded-3xl border p-7 md:p-10 shadow-xl ${theme ? "bg-white border-slate-200" : "bg-[#262a2d] border-[#3a3d3f]"}`}>
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${theme ? "text-[#0e3550]" : "text-slate-100"}`}>Our Story</h2>
            <p className={`${theme ? "text-slate-600" : "text-slate-300"} leading-relaxed text-lg`}>
              HelpOps-Hub started from the same pain most developers face: cryptic pipeline failures, container bugs, deployment blockers, and hours lost in scattered threads.
              We built this platform to save others from that frustration. What began as a personal effort to collect reliable DevOps fixes evolved into a growing ecosystem where real problems meet practical, human-friendly solutions.
              Today, HelpOps-Hub is not just a website, it is a learning journey powered by developers helping developers.
            </p>

            <div className="mt-10 grid md:grid-cols-3 gap-5">
              {[
                { year: "2023", title: "The Idea", text: "Collected personal troubleshooting notes to avoid repeated debugging." },
                { year: "2024", title: "First Community", text: "Opened platform resources and invited developers to share insights." },
                { year: "Today", title: "Growing Hub", text: "Scaling into a trusted DevOps support and learning ecosystem." },
              ].map((item) => (
                <div key={item.title} className={`rounded-2xl p-5 border ${theme ? "border-slate-200 bg-slate-50" : "border-[#3a3d3f] bg-[#1f2224]"}`}>
                  <div className={`text-sm font-bold tracking-wider ${theme ? "text-cyan-700" : "text-cyan-300"}`}>{item.year}</div>
                  <h3 className={`text-xl font-semibold mt-1 ${theme ? "text-slate-900" : "text-slate-100"}`}>{item.title}</h3>
                  <p className={`mt-2 ${theme ? "text-slate-600" : "text-slate-300"}`}>{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 3: Mission & Vision */}
      <Section id="mission-vision" className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-10 ${theme ? "text-[#0e3550]" : "text-slate-100"}`}>
            Our Mission & Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className={`rounded-2xl p-7 shadow-lg border ${theme ? "bg-white border-slate-200" : "bg-[#262a2d] border-[#3a3d3f]"}`}>
              <div className="text-3xl mb-2">🎯</div>
              <h3 className={`text-2xl font-bold ${theme ? "text-slate-900" : "text-slate-100"}`}>Mission</h3>
              <p className={`mt-3 text-lg leading-relaxed ${theme ? "text-slate-600" : "text-slate-300"}`}>
                To make <span className="font-semibold">DevOps learning easier</span> by providing instant solutions and community-driven support.
              </p>
            </div>
            <div className={`rounded-2xl p-7 shadow-lg border ${theme ? "bg-white border-slate-200" : "bg-[#262a2d] border-[#3a3d3f]"}`}>
              <div className="text-3xl mb-2">🔭</div>
              <h3 className={`text-2xl font-bold ${theme ? "text-slate-900" : "text-slate-100"}`}>Vision</h3>
              <p className={`mt-3 text-lg leading-relaxed ${theme ? "text-slate-600" : "text-slate-300"}`}>
                To become the <span className="font-semibold">go-to platform</span> for solving DevOps challenges globally.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 4: What We Offer */}
      <Section id="offer" className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-10 ${theme ? "text-[#0e3550]" : "text-slate-100"}`}>
            What HelpOps-Hub Provides
          </h2>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {offerCards.map((card, index) => (
              <motion.div
                key={card.title}
                className={`rounded-2xl p-6 border shadow-md transition-all duration-300 cursor-default ${
                  theme
                    ? "bg-white border-slate-200 hover:shadow-xl"
                    : "bg-[#262a2d] border-[#3a3d3f] hover:shadow-xl"
                }`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
              >
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className={`text-xl font-semibold ${theme ? "text-slate-900" : "text-slate-100"}`}>{card.title}</h3>
                <p className={`mt-2 leading-relaxed ${theme ? "text-slate-600" : "text-slate-300"}`}>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* SECTION 5: Why Choose Us */}
      <Section id="why-us" className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`rounded-3xl p-8 md:p-10 border shadow-xl ${theme ? "bg-white border-slate-200" : "bg-[#262a2d] border-[#3a3d3f]"}`}>
            <h2 className={`text-3xl md:text-4xl font-bold mb-8 ${theme ? "text-[#0e3550]" : "text-slate-100"}`}>
              Why HelpOps-Hub?
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {choosePoints.map((point) => (
                <div key={point} className={`flex items-start gap-3 p-4 rounded-xl ${theme ? "bg-slate-50" : "bg-[#1f2224]"}`}>
                  <span className="text-xl">✅</span>
                  <p className={`${theme ? "text-slate-700" : "text-slate-200"} text-lg`}>{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 6: Meet the Creator */}
      <Section id="creator" className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-10 ${theme ? "text-[#0e3550]" : "text-slate-100"}`}>
            Meet the Creator
          </h2>
          <div className={`max-w-4xl mx-auto rounded-3xl p-8 border shadow-xl ${theme ? "bg-white border-slate-200" : "bg-[#262a2d] border-[#3a3d3f]"}`}>
            <div className="flex flex-col md:flex-row items-center gap-7">
              <div className={`h-28 w-28 rounded-full p-[3px] overflow-hidden ${theme ? "bg-gradient-to-br from-cyan-400 to-emerald-400" : "bg-gradient-to-br from-cyan-500 to-emerald-500"}`}>
                <img
                  src="/Azfar Alam.webp"
                  alt="Azfar Alam"
                  className="h-full w-full rounded-full object-cover"
                  draggable="false"
                />
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${theme ? "text-slate-900" : "text-slate-100"}`}>Azfar Alam (Founder)</h3>
                <p className={`mt-2 text-lg leading-relaxed ${theme ? "text-slate-600" : "text-slate-300"}`}>
                  DevOps Practitioner, full-stack builder, and community leader helping developers grow.
                </p>
                <div className="mt-4 flex gap-3">
                  <a href="https://github.com/mdazfar2" target="_blank" rel="noopener noreferrer" className={`px-4 py-2 rounded-lg text-sm font-semibold ${theme ? "bg-slate-100 text-slate-800" : "bg-[#1f2224] text-slate-100"}`}>
                    GitHub
                  </a>
                  <a href="https://www.linkedin.com/in/md-azfar-alam/" target="_blank" rel="noopener noreferrer" className={`px-4 py-2 rounded-lg text-sm font-semibold ${theme ? "bg-cyan-100 text-cyan-800" : "bg-cyan-500/20 text-cyan-200"}`}>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTION 7: Community & Open Source */}
      <Section id="community" className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`rounded-3xl p-8 md:p-10 border shadow-xl ${theme ? "bg-gradient-to-r from-cyan-50 to-emerald-50 border-cyan-100" : "bg-gradient-to-r from-[#202c36] to-[#1e2c27] border-[#3a4b48]"}`}>
            <h2 className={`text-3xl md:text-4xl font-bold ${theme ? "text-[#0e3550]" : "text-slate-100"}`}>Built with Community</h2>
            <p className={`mt-4 text-lg max-w-3xl ${theme ? "text-slate-700" : "text-slate-300"}`}>
              HelpOps-Hub grows through open-source collaboration, contributor passion, and community participation from programs like GSSOC and beyond.
              If you want to build meaningful DevOps resources with us, this is your place.
            </p>
            <a
              href="https://github.com/mdazfar2/HelpOps-Hub"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-block mt-6 px-6 py-3 rounded-xl font-semibold ${theme ? "bg-[#0e3550] text-white" : "bg-cyan-400 text-[#0b1720]"}`}
            >
              Contribute Now
            </a>
          </div>
        </div>
      </Section>

      {/* SECTION 8: Stats / Impact */}
      <Section id="impact" className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className={`text-3xl md:text-4xl font-bold text-center mb-10 ${theme ? "text-[#0e3550]" : "text-slate-100"}`}>Our Impact</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard value={12000} label="Developers Reached" />
            <StatCard value={4800} label="Issues Solved" />
            <StatCard value={320} label="Blogs Published" />
            <StatCard value={170} label="Contributors" />
          </div>
        </div>
      </Section>

      {/* SECTION 9: Final CTA */}
      <Section id="final-cta" className="pt-16 pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className={`rounded-3xl p-8 md:p-12 text-center border shadow-2xl ${theme ? "bg-white border-slate-200" : "bg-[#262a2d] border-[#3a3d3f]"}`}>
            <h2 className={`text-3xl md:text-5xl font-extrabold ${theme ? "text-[#0e3550]" : "text-slate-100"}`}>
              Join the HelpOps-Hub Community
            </h2>
            <p className={`mt-4 text-lg md:text-xl ${theme ? "text-slate-600" : "text-slate-300"}`}>
              Start solving DevOps problems, learning faster, and contributing today.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/devopsforum" className="px-6 py-3 rounded-xl font-semibold bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-300">
                Explore Issues
              </a>
              <a href="/blogs" className={`px-6 py-3 rounded-xl font-semibold border ${theme ? "border-slate-300 text-slate-800 hover:bg-slate-100" : "border-[#4b5563] text-slate-100 hover:bg-[#1f2224]"} transition-colors duration-300`}>
                Start Learning
              </a>
            </div>
          </div>
        </div>
      </Section>

    </div>
  );
};

export default AboutPage;
