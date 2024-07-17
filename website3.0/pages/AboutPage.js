import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AboutPage = ({ theme }) => {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
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

  return (
    <div className={`w-full ${theme ? "bg-gradient-to-br from-indigo-50 via-white to-purple-50" : "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"}`}>


      {/* Hero Section */}
      <Section id="hero" className="h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            className="w-full h-full object-cover"
            style={{ filter: "brightness(50%)" }}
          >
            <source src="/HelpOps-H.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="z-10 text-center">
          <motion.h1
            className="text-7xl font-extrabold text-white mb-4 tracking-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)", // Adds a subtle text shadow
              letterSpacing: "-2px", // Adjusts letter spacing for a tighter look
              fontFamily: "'Roboto', sans-serif", // Custom font family if needed
            }}
          >
            HelpOps-Hub
          </motion.h1>

          <motion.p
            className="text-2xl text-white mb-8 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
          >
            Empowering <motion.span style={{ fontWeight: "bold", textShadow: "0px 0px 8px rgba(255, 255, 255, 0.8)" }}>DevOps Professionals</motion.span> Worldwide
          </motion.p>
          <motion.button
            className="mt-4 px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-xl hover:bg-indigo-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Learn More
          </motion.button>
        </div>
      </Section>


      {/* What is HelpOps-Hub */}
      <Section id="what" className="relative">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center bg-white rounded-lg shadow-xl overflow-hidden">
          <motion.div
            className="lg:w-1/2 order-2 lg:order-1 p-6 lg:p-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-6 text-indigo-700">
              What is HelpOps-Hub?
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed text-gray-700">
              HelpOps-Hub is a revolutionary platform designed to empower DevOps professionals. We provide cutting-edge tools, resources, and a vibrant community to streamline your workflow and boost productivity.
            </p>
          </motion.div>
          <motion.div
            className="lg:w-1/2 order-1 lg:order-2 relative p-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.img
              src="new/HelpOps-H Fevicon.webp"
              alt="HelpOps Logo"
              className="w-full max-w-xs lg:max-w-sm mx-auto rounded-lg shadow-2xl"
              style={{ translateY: '-30px' }}
              whileHover={{
                scale: 1.1,
                rotate: [0, 10, -10, 0],
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.9 }}
            />
          </motion.div>
        </div>
      </Section>

      {/* Our Mission */}
      <Section id="mission" className="relative bg-gradient-to-r from-indigo-500 to-purple-500 text-white py-10 lg:py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center bg-opacity-75 rounded-lg shadow-xl">
          <motion.div
            className="lg:w-1/2 mb-6 lg:mb-0 relative z-10 p-6 lg:p-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
              Our Mission
            </h2>
            <p className="text-lg lg:text-xl leading-relaxed">
              At HelpOps-Hub, we're on a mission to revolutionize the DevOps landscape. We're building a global community of innovators, problem-solvers, and tech enthusiasts. Our goal is to provide a platform where knowledge flows freely, collaboration thrives, and groundbreaking solutions are born.
            </p>
          </motion.div>
          <motion.div
            className="lg:w-1/2 relative z-10 p-4"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.img
              src="new/mission.webp"
              alt="Mission"
              className="w-full max-w-xs lg:max-w-md mx-auto rounded-lg shadow-2xl"
              style={{ translateY: '-30px' }}
              whileHover={{
                scale: 1.1,
                rotate: [0, 15, -15, 0],
                transition: { duration: 0.5 }
              }}
              whileTap={{ scale: 0.9 }}
            />
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-indigo-900 z-0 pointer-events-none"></div>
      </Section>

      {/* Benefits of HelpOps-Hub */}
      <Section id="benefits">
        <div className="container mx-auto px-4">
          <h2 className={`text-5xl font-bold mb-16 text-center ${theme ? "text-indigo-700" : "text-indigo-300"}`}>
            Benefits of HelpOps-Hub
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { title: "Comprehensive Resources", icon: "📚" },
              { title: "Community Collaboration", icon: "🤝" },
              { title: "Time Savings", icon: "⏱️" },
              { title: "Continuous Learning", icon: "🧠" },
              { title: "Skill Enhancement", icon: "🚀" },
              { title: "Innovation Hub", icon: "💡" },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className={`p-6 rounded-xl shadow-lg ${theme ? 'bg-white' : 'bg-gray-800'} transform hover:-translate-y-2 transition-all duration-300`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center justify-center mb-4">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-indigo-600 text-white text-3xl"
                    whileHover={{
                      scale: 1.2,
                      rotate: [0, 10, -10, 0],
                      transition: { duration: 0.5 }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {benefit.icon}
                  </motion.div>
                </div>
                <h3 className="text-xl lg:text-2xl font-bold mb-2 text-center text-gray-900">{benefit.title}</h3>
                <p className="text-lg text-center text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero non est lacinia, at iaculis nisi ullamcorper.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default AboutPage;
