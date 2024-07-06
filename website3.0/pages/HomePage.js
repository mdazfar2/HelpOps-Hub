"use client"
import React, { useEffect, useState, useRef } from "react";
import "@stylesheets/homepage.css";
import { useRouter } from "next/navigation";
import Lodaernewletter from "../components/Loadernewletter";
import Popup from "@components/Popup";
import Spline from "@splinetool/react-spline";

//Importing FontAwesome for Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faHeart,
  faAnglesDown,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

//Importing the AOS Package for Scroll Animations
import AOS from "aos";
import "aos/dist/aos.css";

//Importing the SplideJS Package
import Splide from "@splidejs/splide";
import "@splidejs/splide/dist/css/splide.min.css";
import ParticlesComponent from "@components/ParticleBackground";
import { useSession } from "next-auth/react";
import Reset from "@components/Reset";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [blur, setBLur] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const splineRef = useRef(null);
  let session = useSession();
 
  useEffect(() => {
    // Extract token from URL query parameters
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      setShowModal(true);
      // Perform any actions you need with the token
      console.log("Token:", token);
    } else {
      // If no token, you can handle it accordingly
      console.log("No token found");
    }
  }, []);

  function func() {
    if (session.status === "authenticated") {
      console.log(localStorage.getItem("count"));
      if (localStorage.getItem("count") == null) {
        localStorage.setItem("count", true);
        setShowPopup(true);

        setTimeout(() => {
          setShowPopup(false);
        }, 2000);
      }
    }
  }
 
  useEffect(() => {
    document.addEventListener("DOMContentLoaded",func())
    return () => {
      document.removeEventListener("DOMContentLoaded",func())
    };
  }, [session.status]);

  // Initialize the Splide carousel on component mount
  useEffect(() => {
    const splide = new Splide("#splide", {
      type: "loop",
      drag: "free",
      focus: "center",
      perPage: 5,
      pagination: false,
      arrows: false,
      autoplay: true,
      interval: 0,
      speed: 60000,
      rewind: true,
      breakpoints: {
        640: {
          perPage: 2,
        },
      },
    });

    splide.mount();

    // Cleanup Splide instance on component unmount
    return () => {
      splide.destroy();
    };
  }, []);

  const router = useRouter();

  // Initialize AOS (Animate on Scroll) library for scroll animations
  useEffect(() => {
    setTimeout(() => {
      AOS.init({
        duration: 1200,
      });
    }, 100);

    // Refresh AOS on component unmount
    return () => {
      AOS.refreshHard();
    };
  }, []);

  // Navigate to the /resources page when "Get started" button is clicked
  const handleGetStartedClick = () => {
    router.push("/resources");
  };

  const [email, setEmail] = useState(""); // State to hold email input
  const [error, setError] = useState(""); // State to hold error messages

  // Function to validate email format
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  // Function to handle subscription process
  const subscribe = async () => {
    setTimeout(() => {
      setEmail("");
    }, 2000);
    setBLur(true);
    // Validate email format
    setLoading(true);
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setTimeout(() => {
        setError("");
      }, 2000);
      setLoading(false);
      setBLur(false);

      return;
    }

    setError(""); // Clear any previous error messages

    try {
      // If email is valid, proceed to subscribe using local API
      const subscribeResult = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // Process the response from the subscription endpoint
      const subscribeData = await subscribeResult.json();
      console.log("data: " + subscribeData);

      // Display success or failure message based on subscription result
      if (subscribeData.success) {
        setError("Subscribed Successfully");
        setTimeout(() => {
          setError("");
        }, 2000);
      } else {
        if (subscribeData.message === "User already subscribed") {
          setError("User is already subscribed");
        } else {
          setError("Subscription failed");
        }
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      // Handle any errors that occur during the process
      setError("An error occurred. Please try again.");
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    setLoading(false);
    setBLur(false);
  };

  // For handling key event
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (validateEmail(email)) {
        subscribe();
      }
    }
  };

  return (
    <div className="">
      {/* {showPopup && (
        <Popup
          msg={`${userName} Welcome !!`}
          error="green1"
        />
      )} */}
      {showModal && <Reset />}
      {error && (
        <Popup
          msg={error}
          error={`${error === "Subscribed Successfully" ? "green1" : "red1"}`}
        />
      )}
      <div className="relative h-screen">
        <div ref={splineRef}>
              {/* <Spline scene="/Section1_Scene.splinecode"/> */}
        </div>
      </div>

      <div className="absolute z-10 top-48 flex justify-left ml-32 items-center">
        <div className="p-16 bg-gray-100 rounded-3xl shadow-xl">
          <h1 className="text-8xl mb-5 font-bold text-[#63B5C3]">
            HelpOps-Hub
          </h1>
          <p className="ubuntu text-black font-extralight text-4xl w-96 mb-5">
            Ensuring You Never Get Stuck In DevOps Again!
          </p>
          <button className="bg-[#63B5C3] text-white rounded-full px-5 py-3" onClick={handleGetStartedClick}>
            Get started
          </button>
        </div>
      </div>

      <div className=" relative mt-32">
        {/* <Spline scene="/Section2_Scene.splinecode" /> */}
        <button className="w-32 h-12 absolute top-[570px] left-1/2 translate-x-[-60%]"></button>
      </div>

      <div className="container h-56 flex gap-5 mt-40 px-16 relative">
        <div className="text-black w-1/4 h-full border-2 border-black relative -top-10 rounded-xl hover:scale-105 transition-all duration-700 cursor-pointer">
          <div className="flex p-4 gap-5 items-center">
            <img src="/i1.png" className="w-14 rounded-full" />
            <div className="font-medium text-2xl">Ask Questions</div>
          </div>
          <div className="text-center">
            Easily post detailed queries about your DevOps challenges.
          </div>
        </div>
        <div className="text-black w-1/4 h-full border-2 border-black rounded-xl hover:scale-105 transition-all duration-700 cursor-pointer">
          <div className="flex p-4 gap-5 items-center">
            <img src="/i2.png" className="w-14 rounded-full" />
            <div className="font-medium text-2xl">Receive Expert Help</div>
          </div>
          <div className="text-center">
            Tap into the collective knowledge of experienced DevOps
            professionals.
          </div>
        </div>
        <div className="text-black w-1/4 h-full border-2 border-black rounded-xl hover:scale-105 transition-all duration-700 cursor-pointer">
          <div className="flex p-4 gap-5 items-center">
            <img src="/i4.png" className="w-14 rounded-full" />
            <div className="font-medium text-2xl">Collaborate and Learn</div>
          </div>
          <div className="text-center px-4">
            Engage with a community dedicated to sharing knowledge and solving
            problems.
          </div>
        </div>
        <div className="text-black w-1/4 h-full border-2 border-black relative -top-10 rounded-xl hover:scale-105 transition-all duration-700 cursor-pointer">
          <div className="flex p-4 gap-5 items-center">
            <img src="/i3.png" className="w-14 rounded-full" />
            <div className="font-medium text-2xl">Save Time</div>
          </div>
          <div className="text-center">
            Quickly resolve issues and focus on what matters most – driving your
            projects forward.
          </div>
        </div>
      </div>

      <div className="flex items-center relative h-[600px] mt-16 mb-16 px-16">
        <div className="h-full w-1/2">
          {/* <Spline scene="/Section3_Scene.splinecode" /> */}
        </div>
        <div className="w-1/2">
          <div className="text-7xl text-gray-700 font-medium ">
            <p className="text-8xl font-semibold">Solve</p>
            DevOps Issues Together
          </div>
          <div className="text-gray-700 ml-5 relative mt-8 cursor-pointer hover:scale-105 transition-all hover:translate-x-4">
            <div className="h-12 w-32 bg-white absolute z-10 text-2xl flex justify-center items-center">Let's Go</div>
            <div className="h-12 w-32 absolute bg-gray-400 top-2 -left-2 z-0"></div>
          </div>
        </div>
      </div>

      {/*Section: Banner with carousel using SplideJS*/}

      <div className="text-center mt-16 mb-16 font-semibold overflow-hidden w-full flex flex-col gap-16 justify-center items-center">
        <h1 className="text-center text-6xl font-semibold text-gray-700" data-aos="fade-up">
          DevOps Arsenal
        </h1>
        <div
          id="splide"
          className="splide icn"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="splide__track">
            <div className="splide__list icons">
              <div className="splide__slide">
                <img src="/b1.png" alt="Cloud Icon" />
              </div>
              <div className="splide__slide">
                <img src="/b2.png" alt="Monitor Icon" />
              </div>
              <div className="splide__slide">
                <img src="/b3.png" alt="Pipeline Icon" />
              </div>
              <div className="splide__slide">
                <img src="/b4.png" alt="DevOps Icon" />
              </div>
              <div className="splide__slide">
                <img src="/b5.png" alt="Container Icon" />
              </div>
              <div className="splide__slide">
                <img src="/b6.png" alt="Tools Icon" />
              </div>
            </div>
          </div>
        </div>

        {/*Section: Newsletter subscription*/}

        <div className="w-[95vw] mb-16 mt-14 z-[50]">
          <div className="rounded-3xl flex p-16 px-4 w-[90%] mx-auto bg-gray-200 shadow-lg">
            <div className="w-2/5 flex justify-center items-center">
              <img src="HelpOps-H Fevicon.png" alt="Logo" data-tilt className="h-20"/>
              <h3 className="text-5xl font-normal">elpOps-Hub</h3>
            </div>
            <div className="w-3/5 flex flex-col justify-center items-center">
              <p className="text-lg font-normal m-2.5 w-[70%] text-left">Subscribe to our newsletter</p>
              <div className="w-[70%] flex -ml-14">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="relative left-[6%] top-1/2 text-black pointer-events-none z-0 translate-y-[-50%]"
                  width={25}
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  onKeyDown={handleKeyDown}
                  className={`${blur ? "blurclass" : ""} input-field `}
                />
                <button className="text-white rounded-lg ml-2 bg-black bg-opacity-80 text-lg font-normal w-28 h-10" style={{fontFamily:"serif"}} onClick={subscribe}>
                  Subscribe &nbsp;{" "}
                  {loading && (
                    <div className="loader2">
                      <div className="circle">
                        <div className="dot"></div>
                        <div className="outline"></div>
                      </div>
                    </div>
                  )}
                </button>
              </div>
              {error && <p className="error-message-desktop">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
