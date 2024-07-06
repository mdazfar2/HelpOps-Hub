"use client";
import React, { useEffect } from "react";
// import "@stylesheets/abouts.css";
import AuthButton from "@components/AuthButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
function AboutPage() {
  // to add body bg color
  useEffect(() => {
    console.log("sdsd");
    function updateBackground() {
      if (document.body.classList.contains("dark-mode")) {
        document.body.style.background = "#353535";
      } else {
        document.body.style.background = "#EEE";
      }
    }
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.attributeName === "class") {
          updateBackground();
        }
      }
    });

    observer.observe(document.body, { attributes: true });

    // Initial background update
    updateBackground();
    // Clean-up function to reset background color when component unmounts
    return () => {
      document.body.style.background = "";
      observer.disconnect();
    };
  }, []);
  return (
    <div>
      <div className="relative mt-36 items-center gap-2 hidden max-[400px]:flex justify-center top-0 w-full">
        <a href="https://github.com/sponsors/mdazfar2" target="_blank">
          <button
            className="bg-gray-100/80 border-none rounded-2xl shadow-md shadow-black/20 text-black text-xl cursor-pointer text-center transition-all duration-500 ease-in-out w-30 p-2 hover:transform hover:translate-x-2.5 hover:bg-none hover:border-2 hover:border-whitesmoke mr-5"
            style={{ fontFamily: "ubuntu" }}
          >
            <FontAwesomeIcon icon={faHeart} id="heart" width={25} />
            Sponsor
          </button>
        </a>
        <div className="block">
          <AuthButton />
        </div>
      </div>

      <div className="w-full mt-40 max-[400px]:mt-10 p-4 md:px-8 lg:px-16">
        {/* Section: Title */}
        <div className="text-4xl text-center font-semibold">About us</div>

        {/* Section: Video */}
        <div className="w-full flex justify-center">
          <video
            src="/HelpOps-H.mp4"
            autoPlay
            loop
            muted
            className="w-full md:w-4/5 mt-10 rounded-2xl shadow-2xl"
          ></video>
        </div>

        {/* Section: What is HelpOps-Hub */}
        <div className="flex flex-col md:flex-row flex-col-reverse justify-center items-center md:space-x-20 w-full mb-10">
          <div
            className="flex flex-col justify-center items-center w-full p-10 md:w-1/2 ml-2 md:mr-36"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            <h1 className="text-3xl md:text-5xl font-semibold text-center mb-4">
              What is HelpOps-Hub?
            </h1>
            <p className="text-desc text-center w-full ">
              HelpOps-Hub is a comprehensive, community-driven platform designed
              to support and empower DevOps beginners and professionals. Founded
              by Azfar Alam, HelpOps-Hub offers a centralized resource for
              tools, best practices, tutorials, and real-world examples to
              streamline workflows, enhance productivity, and foster
              collaboration in the DevOps field. Whether you're a seasoned
              expert or just starting out, HelpOps-Hub provides the knowledge
              and support needed to overcome challenges, improve skills, and
              achieve success in DevOps projects. Join our vibrant community to
              share experiences, contribute solutions, and drive the future of
              DevOps together.
            </p>
          </div>
          <div className="w-full md:w-1/5 flex justify-center">
            <img
              src="/HelpOps-H Fevicon.png"
              alt="HelpOps Logo"
              className="w-2/4 md:w-full"
            />
          </div>
        </div>

        {/* Section: Our Mission */}
        <div className="flex flex-col md:flex-row justify-center items-center md:space-x-20 mb-10">
          <div className="w-full md:w-1/4 mx-auto md:mb-0">
            <img
              src="/mission.png"
              alt="Mission"
              className="w-3/4 md:w-full mx-auto"
            />
          </div>
          <div
            className="flex flex-col justify-center items-center w-full p-10 md:w-1/2 ml-2 mx-auto"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            <h1 className="text-3xl md:text-5xl font-semibold text-center mb-4">
              Our Mission
            </h1>
            <p className="text-desc text-center">
              Our mission at HelpOps-Hub is to empower DevOps professionals by
              providing a comprehensive, community-driven platform that
              consolidates tools, best practices, tutorials, and real-world
              examples. We aim to streamline workflows, enhance productivity,
              and foster collaboration and innovation within the DevOps
              community. By offering a centralized hub of resources and support,
              HelpOps-Hub seeks to prevent individuals from getting stuck on
              issues, accelerate learning, and promote continuous improvement in
              DevOps practices. Join us to share your knowledge, contribute
              solutions, and help shape the future of DevOps.
            </p>
          </div>
        </div>

        {/* Section: Benefits of HelpOps-Hub */}
        <div className="flex flex-col md:flex-row flex-col-reverse justify-center items-center md:space-x-20 mb-10">
          <div className="flex flex-col justify-center items-center w-full p-10 md:w-1/2 md:ml-2 mx-auto">
            <h1 className="text-3xl md:text-5xl font-semibold text-center mb-4">
              Benefits of HelpOps-Hub
            </h1>
            <ol className="text-desc text-left md:text-center list-decimal list-inside">
              <li>
                <b>Comprehensive Resources</b>: Access a wide range of tools,
                best practices, tutorials, and real-world examples, all in one
                place.
              </li>
              <li>
                <b>Community Collaboration</b>: Join a vibrant community of
                DevOps enthusiasts to share experiences, provide solutions, and
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
              src="/benefit.png"
              alt="Benefits"
              className="w-3/4 md:w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
