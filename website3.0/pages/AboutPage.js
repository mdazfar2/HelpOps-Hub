"use client";
import React, { useEffect, useState } from "react";
// import "@stylesheets/abouts.css";

function AboutPage({ theme }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer); 
  }, []);
  return (
    <div
      className={` w-full items-center pt-32 p-4  md:px-8 lg:px-16  ${
        theme ? "" : "bg-[#1e1d1d]"
      }`}
    >
      {/* Section: Title */}
      <div
        className={` ${
          theme ? "" : "text-white"
        } text-4xl text-center font-semibold`}
      >
        About us
      </div>

      {/* Section: Video */}
      <div className="w-full flex justify-center">
        {loading ? (
                   <div className="w-full md:w-4/5 mt-10 rounded-2xl shadow-2xl bg-gray-600 animate-pulse" ></div>
        ) : (
          <video
            src="/HelpOps-H.mp4"
            autoPlay
            loop
            muted
            className="w-full md:w-4/5 mt-10 rounded-2xl shadow-2xl"
          ></video>
        )}
      </div>

      {/* Section: What is HelpOps-Hub */}
      <div className="flex flex-col md:flex-row flex-col-reverse justify-center items-center md:space-x-20 w-full mb-10">
        <div
          className="flex flex-col justify-start items-start w-full p-10 pl-1 max-md:pl-10 md:w-1/2 ml-2 md:mr-36"
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <h1
            className={`text-3xl text-left md:text-5xl font-semibold  ${
              theme ? "" : "text-white"
            } mb-4`}
          >
            What is HelpOps-Hub?
          </h1>
          <p
            className={`text-desc   ${
              theme ? "" : "text-white"
            }  text-justify max-w-[500px]  w-auto`}
          >
            HelpOps-Hub is a comprehensive, community-driven platform designed
            to support and empower DevOps beginners and professionals. Founded
            by Azfar Alam, HelpOps-Hub offers a centralized resource for tools,
            best practices, tutorials, and real-world examples to streamline
            workflows, enhance productivity, and foster collaboration in the
            DevOps field. Whether you're a seasoned expert or just starting out,
            HelpOps-Hub provides the knowledge and support needed to overcome
            challenges, improve skills, and achieve success in DevOps projects.
            Join our vibrant community to share experiences, contribute
            solutions, and drive the future of DevOps together.
          </p>
        </div>
        <div className="w-[150px] flex justify-center max-md:hidden">
          <img
            src="new/HelpOps-H Fevicon.webp"
            alt="HelpOps Logo"
            className="w-2/4 md:w-full hover:scale-90 transition-all"
          />
        </div>
      </div>

      {/* Section: Our Mission */}
      <div className="flex flex-col md:flex-row justify-center items-center md:space-x-20 mb-10">
        <div className=" md:w-1/4 mx-auto md:mb-0">
          <img
            src="new/mission.webp"
            alt="Mission"
            className="w-3/4 md:w-full mx-auto hover:scale-90 transition-all"
          />
        </div>
        <div
          className="flex flex-col justify-center items-center w-full p-10  md:w-1/2 ml-2 mx-auto"
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <h1
            className={`  ${
              theme ? "" : "text-white"
            } text-3xl md:text-5xl font-semibold text-center mb-4`}
          >
            Our Mission
          </h1>
          <p
            className={` text-desc text-justify max-w-[400px] w-auto  ${
              theme ? "" : "text-white"
            }`}
          >
            Our mission at HelpOps-Hub is to empower DevOps professionals by
            providing a comprehensive, community-driven platform that
            consolidates tools, best practices, tutorials, and real-world
            examples. We aim to streamline workflows, enhance productivity, and
            foster collaboration and innovation within the DevOps community. By
            offering a centralized hub of resources and support, HelpOps-Hub
            seeks to prevent individuals from getting stuck on issues,
            accelerate learning, and promote continuous improvement in DevOps
            practices. Join us to share your knowledge, contribute solutions,
            and help shape the future of DevOps.
          </p>
        </div>
      </div>

      {/* Section: Benefits of HelpOps-Hub */}
      <div className="flex flex-col md:flex-row flex-col-reverse justify-center items-center md:space-x-20 mb-10">
        <div className="flex flex-col justify-center items-start w-full p-10 md:w-1/2 md:ml-2 mx-auto">
          <h4
            className={` ${
              theme ? "" : "text-white"
            } text-[2rem] md:text-[2rem] font-semibold text-left mb-4`}
          >
            Benefits of HelpOps-Hub
          </h4>
          <ol
            style={{ listStyle: "none" }}
            className={` ${
              theme ? "" : "text-white"
            } text-desc text-justify md:text-justify list-decimal list-inside`}
          >
            <li>
              <b>Comprehensive Resources</b>: Access a wide range of tools, best
              practices, tutorials, and real-world examples, all in one place.
            </li>
            <li>
              <b>Community Collaboration</b>: Join a vibrant community of DevOps
              enthusiasts to share experiences, provide solutions, and
              collaborate on projects.
            </li>
            <li>
              <b>Time Savings</b>: Quickly resolve issues and avoid common
              pitfalls with guidance from experts and community contributions.
            </li>
            <li>
              <b>Continuous Learning</b>: Stay up-to-date with the latest
              trends, technologies, and methodologies in the rapidly evolving
              field of DevOps.
            </li>
            <li>
              <b>Skill Enhancement</b>: Improve your DevOps skills through
              in-depth guides, step-by-step tutorials, and hands-on examples.
            </li>
            <li>
              <b>Support and Feedback</b>: Receive support from a community of
              peers and experts, and contribute your own insights to help
              others.
            </li>
            <li>
              <b>Innovation and Improvement</b>: Participate in the continuous
              improvement of the platform by raising issues, suggesting
              enhancements, and sharing innovative ideas.
            </li>
          </ol>
        </div>
        <div className="w-full md:w-2/5 mx-auto flex justify-center">
          <img
            src="new/benefit.webp"
            alt="Benefits"
            className="w-3/4 md:w-full hover:scale-90 transition-all"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
