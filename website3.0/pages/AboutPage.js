"use client"
import React, { useEffect } from "react";
import "@stylesheets/abouts.css";

function AboutPage() {



  // to add body bg color 
  useEffect(() => {
    console.log('sdsd')
    function updateBackground(){

      if(document.body.classList.contains('dark-mode')){
        document.body.style.background = "#353535";
        
      }else{
        
        document.body.style.background = "linear-gradient(to bottom,#f5d471 2%,#ec904f 35%,#eb9a60 55%,#e99960 65%,#e89357 75%,#e99559 85%)  ";
      }
    }
    const observer = new MutationObserver((mutationsList) => {
      for (let mutation of mutationsList) {
        if (mutation.attributeName === 'class') {
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
    <div className="main">
      {/*Section: Title */}

      <div className="about_title">About us</div>

      {/*Section: Video */}

      <div className="video">
        <video src="/HelpOps-H.mp4" autoPlay loop muted></video>
      </div>

      {/*Section: What is HelpOps-Hub*/}

      <div className="start">
        <div className="img-container">
          <img
            className="about_logo"
            src="/HelpOps-H Fevicon.png"
            alt="HelpOps Logo"
          />
        </div>
        <div
          className="text-container"
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <h1 className="text-title">What is HelpOps-Hub?</h1>
          <p className="text-desc">
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
      </div>

      {/*Section: Our Mission*/}

      <div className="end">
        <div className="img-container">
          <img className="mission" src="/mission.png" alt="Mission" />
        </div>
        <div
          className="text-container"
          style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
        >
          <h1 className="text-title">Our Mission</h1>
          <p className="text-desc">
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

      {/*Section: Benefits of HelpOps-Hub*/}

      <div className="start mb">
        <div className="img-container">
          <img className="benefit" src="/benefit.png" alt="Benefits" />
        </div>
        <div className="text-container">
          <h1 className="text-title">Benefits of HelpOps-Hub</h1>
          <ol className="text-desc">
            <b>
              HelpOps-Hub offers numerous benefits for DevOps professionals:
            </b>
            <br />
            <br />
            <li>
              <b>Comprehensive Resources</b>: Access a wide range of tools, best
              practices, tutorials, and real-world examples, all in one place.
            </li>{" "}
            <li>
              <b>Community Collaboration</b>: Join a vibrant community of DevOps
              enthusiasts to share experiences, provide solutions, and
              collaborate on projects.
            </li>{" "}
            <li>
              <b>Time Savings</b>: Quickly resolve issues and avoid common
              pitfalls with guidance from experts and community contributions.
            </li>{" "}
            <li>
              <b>Continuous Learning</b>: Stay up-to-date with the latest
              trends, technologies, and methodologies in the rapidly evolving
              field of DevOps.
            </li>{" "}
            <li>
              <b>Skill Enhancement</b>: Improve your DevOps skills through
              in-depth guides, step-by-step tutorials, and hands-on examples.
            </li>{" "}
            <li>
              <b>Support and Feedback</b>: Receive support from a community of
              peers and experts, and contribute your own insights to help
              others.
            </li>{" "}
            <li>
              <b>Innovation and Improvement</b>: Participate in the continuous
              improvement of the platform by raising issues, suggesting
              enhancements, and sharing innovative ideas.
            </li>
            <br />
            <b>
              By leveraging HelpOps-Hub, DevOps professionals can streamline
              their workflows, enhance productivity, and drive the future of
              DevOps.
            </b>{" "}
          </ol>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
