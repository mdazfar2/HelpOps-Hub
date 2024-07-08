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
import { useSession } from "next-auth/react";
import Reset from "@components/Reset";
function HomePage({ theme }) {
  const [loading, setLoading] = useState(false);
  const [blur, setBLur] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadSpline, setLoadSpline] = useState(false);
  const [visible, setVisible] = useState(false);
  const [splineKey, setSplineKey] = useState(0);
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
    document.addEventListener("DOMContentLoaded", func());
    return () => {
      document.removeEventListener("DOMContentLoaded", func());
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

  useEffect(() => {
    const splideMobile = new Splide("#splideMobile", {
      type: "loop",
      perPage: 2,
      pagination: false,
      arrows: true,
      breakpoints: {
        960: {
          perPage: 1,
        },
      },
    });

    splideMobile.mount();

    return () => {
      splideMobile.destroy();
    };
  }, []);

  const router = useRouter();

  // Initialize AOS (Animate on Scroll) library for scroll animations
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        duration: 1200,
      });
    };

    const timeoutId = setTimeout(initAOS, 100);

    // Refresh AOS when the component unmounts
    return () => {
      clearTimeout(timeoutId);
      AOS.refreshHard();
    };
  }, [theme]);

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
  useEffect(() => {
    const handleResize = () => {
      setLoadSpline(false);
      setVisible(false);
      setTimeout(() => {
        setSplineKey((prevKey) => prevKey + 1);
        setLoadSpline(true);
        setTimeout(() => {
          setVisible(true);
        }, 10);
      }, 10);
    };

    window.addEventListener("resize", handleResize);

    // Initial load
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div
      className={`${
        theme ? "bg-gray-100" : " bg-[#1e1d1d]"
      } transition-colors duration-500`}
    >
      {showPopup && (
        <Popup
          msg={`${localStorage.getItem("userName")} Welcome !!`}
          error="green1"
        />
      )}
      {showModal && <Reset />}
      {error && (
        <Popup
          msg={error}
          error={`${error === "Subscribed Successfully" ? "green1" : "red1"}`}
        />
      )}
      <div
        className={`${
          theme ? "bg-gray-100" : "bg-[#656566]"
        } relative h-screen max-sm:h-0 overflow-hidden transition-colors duration-500`}
      >
        {/* {loadSpline && (
            <div className={`block min-h-[720px] h-screen max-xl:hidden fade-in ${visible ? "visible" : ""}`} ref={splineRef}>
              <Spline scene="/Section1_Scene.splinecode" key={splineKey} />
            </div>
          )} */}
        <div
          className={`${
            theme ? "bg-[#DCDDDC]" : "bg-[#1e1d1d]"
          } shadow-inner w-full h-[300px] absolute bottom-0 transition-colors duration-500`}
        ></div>
        <img
          src="new/temp_bg.webp"
          alt="HelpOps-Hub"
          className="absolute top-[340px] max-2xl:top-[390px] max-2xl:text-black translate-y-[-200px] max-xl:hidden right-0 max-2xl:-right-12 w-[47%] hover:scale-105 transition-all duration-500 ease-in-out"
          draggable="false"
        />
      </div>

      <div className="absolute max-sm:static max-sm:mt-48 z-10 top-48 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:ml-0 flex justify-left ml-24 max-2xl:ml-10 items-center transition-all duration-500">
        <div
          className={`${
            theme ? "bg-white" : "bg-[#292727]  shadow-md"
          } p-16 max-[450px]:w-[95%] max-[450px]:py-14 max-[420px]:px-0 rounded-3xl shadow-xl max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center transition-colors duration-500`}
        >
          <h1
            className={`${
              theme ? "text-[#63B5C3] " : "text-white"
            } text-[85px] max-lg:text-7xl max-sm:text-6xl max-[420px]:text-5xl max-sm:text-center mb-5 font-bold transition-colors duration-500`}
          >
            HelpOps-Hub
          </h1>
          <p
            className={`${
              theme ? "text-black " : "text-white"
            } ubuntu  max-[420px]:p-4 font-extralight max-sm:text-center text-4xl max-sm:text-3xl max-[420px]:text-2xl w-96 mb-5 transition-colors duration-500`}
          >
            Ensuring You Never Get Stuck In DevOps Again!
          </p>
          <button
            className={`${
              theme ? "bg-[#63B5C3] text-white" : "bg-gray-100 text-black"
            } rounded-full max-sm:w-32 max-sm:px-3 max-sm:py-2 px-5 py-3 transition-colors duration-500`}
            onClick={handleGetStartedClick}
          >
            Get started
          </button>
        </div>
      </div>
      <div className="w-full h-[400px] mt-4 flex justify-center items-center focus:outline-0 sm:hidden">
        <video
          src={`${theme ? "/Mobile-Devops.mp4" : "/Devops-Dark.mp4"}`}
          className={`${theme ? "" : "brightness-95 contrast-[1.01]"}`}
          loop
          autoPlay
          muted
          playsInline
        >
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="flex flex-col justify-center items-center transition-colors duration-300">
        <div className=" relative mt-32 flex justify-center max-sm:mt-4 h-[650px] w-[1024px] max-lg:w-full max-lg:h-[520px]">
          <Spline scene="/Section2_Scene.splinecode" />
          <div className="absolute top-16 max-xl:scale-90 max-lg:scale-75 max-[620px]:scale-[0.6] max-[580px]:w-[160%] max-lg:top-0 flex flex-col justify-center items-center">
            <div
              className={`${
                theme ? "text-[#2C939E] " : "text-white"
              } text-center transition-colors duration-500 text-[108px] leading-[1.2] font-bold`}
            >
              Discover,
              <br />
              Learn, and
              <br /> Grow
            </div>
            <div
              className={`${
                theme ? "text-black" : "text-white"
              } w-[60%] text-center text-xl text-black`}
            >
              Discover the Latest Trends and Innovations in Devops Practices and
              Technologies
            </div>
            <div
              className={`${
                theme ? "text-gray-700" : "text-white"
              } relative mt-8 cursor-pointer transition-all w-full flex`}
            >
              <div className=" relative left-[45%] max-[620px]:left-[38%]">
                <div className="text-black h-12 w-32 bg-white absolute z-10 text-lg flex justify-center items-center">
                  Start Now
                </div>
                <div className="h-12 w-32 absolute bg-gray-400 top-2 -left-2 z-0"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-56 flex gap-5 mt-40 px-16 relative max-xl:hidden">
        <div
          className={`${
            theme
              ? "text-black border-black"
              : "text-white bg-[#26272b] border-white border-dashed"
          } text-black w-1/4 h-full border-2 relative -top-10 rounded-xl hover:scale-105 transition-all duration-700 cursor-pointerz`}
        >
          <div className="flex p-4 gap-5 items-center">
            <img src="new/i1.webp" className="w-14 rounded-full" alt="ask-questions" />
            <div className="font-medium text-2xl">Ask Questions</div>
          </div>
          <div className="text-center">
            Easily post detailed queries about your DevOps challenges.
          </div>
        </div>
        <div
          className={`${
            theme
              ? "text-black border-black"
              : "text-white bg-[#26272b] border-white border-dashed"
          } text-black w-1/4 h-full border-2 rounded-xl hover:scale-105 transition-all duration-700 cursor-pointerz`}
        >
          <div className="flex p-4 gap-5 items-center">
            <img src="new/i2.webp" className="w-14 rounded-full"  alt="receive ecpert help" />
            <div className="font-medium text-2xl">Receive Expert Help</div>
          </div>
          <div className="text-center">
            Tap into the collective knowledge of experienced DevOps
            professionals.
          </div>
        </div>
        <div
          className={`${
            theme
              ? "text-black border-black"
              : "text-white bg-[#26272b] border-white border-dashed"
          } text-black w-1/4 h-full border-2 rounded-xl hover:scale-105 transition-all duration-700 cursor-pointerz`}
        >
          <div className="flex p-4 gap-5 items-center">
            <img src="new/i4.webp" className="w-14 rounded-full"  alt="collaborate and learn" />
            <div className="font-medium text-2xl">Collaborate and Learn</div>
          </div>
          <div className="text-center px-4">
            Engage with a community dedicated to sharing knowledge and solving
            problems.
          </div>
        </div>
        <div
          className={`${
            theme
              ? "text-black border-black"
              : "text-white bg-[#26272b] border-white border-dashed"
          } text-black w-1/4 h-full border-2 relative -top-10 rounded-xl hover:scale-105 transition-all duration-700 cursor-pointerz`}
        >
          <div className="flex p-4 gap-5 items-center">
            <img src="new/i3.webp" className="w-14 rounded-full"  alt="save time" />
            <div className="font-medium text-2xl">Save Time</div>
          </div>
          <div className="text-center">
            Quickly resolve issues and focus on what matters most - driving your
            projects forward.
          </div>
        </div>
      </div>

      <div className="h-56 flex items-center justify-center max-sm:px-0 gap-5 mt-16 px-16 relative xl:hidden">
        <div id="splideMobile" className="splide w-full">
          <div className="splide__track">
            <ul className="splide__list">
              <li className="splide__slide p-2">
                <div
                  className={`${
                    theme
                      ? "text-black border-black"
                      : "text-white bg-[#26272b] border-white border-dashed"
                  } w-full h-full border-2 rounded-xl cursor-pointer p-4`}
                >
                  <div className="flex p-4 gap-5 items-center justify-center">
                    <img src="new/i1.webp" className="w-16 rounded-full"  alt="Ask questions" />
                    <div className="font-medium text-3xl">Ask Questions</div>
                  </div>
                  <div className="text-center text-2xl">
                    Easily post detailed queries about your DevOps challenges.
                  </div>
                </div>
              </li>
              <li className="splide__slide p-2">
              <div
                  className={`${
                    theme
                      ? "text-black border-black"
                      : "text-white bg-[#26272b] border-white border-dashed"
                  } w-full h-full border-2 rounded-xl cursor-pointer p-4`}
                >
                  <div className="flex p-4 gap-5 items-center justify-center">
                    <img src="new/i2.webp" className="w-16 rounded-full" />
                    <div className="font-medium text-3xl">
                      Receive Expert Help
                    </div>
                  </div>
                  <div className="text-center text-2xl">
                    Tap into the collective knowledge of experienced DevOps
                    professionals.
                  </div>
                </div>
              </li>
              <li className="splide__slide p-2">
              <div
                  className={`${
                    theme
                      ? "text-black border-black"
                      : "text-white bg-[#26272b] border-white border-dashed"
                  } w-full h-full border-2 rounded-xl cursor-pointer p-4`}
                >
                  <div className="flex p-4 gap-5 items-center justify-center">
                    <img src="new/i4.webp" className="w-16 rounded-full"  alt="collaborate and learn" />
                    <div className="font-medium text-3xl">
                      Collaborate and Learn
                    </div>
                  </div>
                  <div className="text-center text-2xl">
                    Engage with a community dedicated to sharing knowledge and
                    solving problems.
                  </div>
                </div>
              </li>
              <li className="splide__slide p-2">
              <div
                  className={`${
                    theme
                      ? "text-black border-black"
                      : "text-white bg-[#26272b] border-white border-dashed"
                  } w-full h-full border-2 rounded-xl cursor-pointer p-4`}
                >
                  <div className="flex p-4 gap-5 items-center justify-center">
                    <img src="new/i3.webp" className="w-16 rounded-full"  alt="access resources" />
                    <div className="font-medium text-3xl">Access Resources</div>
                  </div>
                  <div className="text-center text-2xl">
                    Explore a library of articles, guides, and tools for your
                    DevOps journey.
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center max-lg:flex-col max-lg:h-auto max-lg:justify-center max-sm:my-0 relative h-[600px] mt-16 mb-16 px-16 max-md:px-3">
        <div className=" w-1/2 max-lg:w-3/4 h-[700px] max-md:w-full max-md:h-[500px] max-md:scale-75">
          <Spline scene="/Section3_Scene.splinecode" />
        </div>
        <div className="w-1/2 max-lg:w-3/4 max-md:w-full">
          <div
            className={`${
              theme ? "text-gray-700" : "text-white"
            } text-7xl font-medium max-lg:text-center max-sm:text-5xl`}
          >
            <p
              className={`${
                theme ? "text-gray-700" : "text-white"
              } text-8xl font-semibold max-sm:text-6xl`}
            >
              Solve
            </p>
            DevOps Issues Together
          </div>
          <div
            className={`${
              theme ? "text-gray-700" : "text-white"
            } ml-5 mt-8 cursor-pointer hover:scale-105 transition-all hover:translate-x-4`}
          >
            <div className="relative w-1/4 max-[450px]:w-2/4 max-lg:m-auto h-full">
              <div className="text-black h-12 w-32 bg-white absolute z-10 text-2xl flex justify-center items-center">
                Let's Go
              </div>
              <div className="h-12 w-32 absolute bg-gray-400 top-2 -left-2 z-0"></div>
            </div>
          </div>
        </div>
      </div>

      {/*Section: Banner with carousel using SplideJS*/}

      <div className="text-center mt-16 pb-16 font-semibold overflow-hidden w-full flex flex-col gap-16 justify-center items-center">
        <h1
          className={`${
            theme ? "text-gray-700" : "text-white"
          } text-center text-6xl max-sm:text-4xl max-sm:mt-20 font-semibold`}
          data-aos="fade-up"
        >
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
                <img src="new/b1.webp" alt="Cloud Icon" />
              </div>
              <div className="splide__slide">
                <img src="new/b2.webp" alt="Monitor Icon" />
              </div>
              <div className="splide__slide">
                <img src="new/b3.webp" alt="Pipeline Icon" />
              </div>
              <div className="splide__slide">
                <img src="new/b4.webp" alt="DevOps Icon" />
              </div>
              <div className="splide__slide">
                <img src="new/b5.webp" alt="Container Icon" />
              </div>
              <div className="splide__slide">
                <img src="new/b6.webp" alt="Tools Icon" />
              </div>
            </div>
          </div>
        </div>

        {/*Section: Newsletter subscription*/}

        <div className="w-[95vw] mt-14 z-[50] max-sm:w-full">
          <div
            className={`${
              theme ? "bg-gray-200" : "bg-[#26272b] text-white"
            } rounded-3xl flex p-16 px-4 w-[90%] mx-auto shadow-lg max-[900px]:flex-col items-center align-center`}
          >
            <div className="w-2/5 flex justify-center items-center max-[900px]:w-full">
              <img
                src="new/HelpOps-H Fevicon.webp"
                alt="Logo"
                data-tilt
                className="h-20"
                draggable="false"
              />
              <h3 className="text-5xl font-normal max-[1100px]:text-4xl">
                elpOps-Hub
              </h3>
            </div>
            <div className="w-3/5 flex flex-col justify-center items-center">
              <p className="pl-7 text-lg font-normal m-2.5 w-[70%] text-left max-[900px]:text-center max-[900px]:w-full">
                Subscribe to our newsletter
              </p>
              <div className="w-[70%] flex relative max-[900px]:justify-center">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="relative top-3 left-7  text-black pointer-events-none z-"
                  width={25}
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  onKeyDown={handleKeyDown}
                  className={`${blur ? "blurclass" : ""} input-field text-black`}
                />
                <button
                  className="text-white rounded-lg ml-2 p-1 bg-black bg-opacity-80 text-lg font-normal w-28 h-10"
                  style={{ fontFamily: "serif" }}
                  onClick={subscribe}
                >
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
