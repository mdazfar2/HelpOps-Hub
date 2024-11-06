import React, { useEffect, useState, useRef } from "react";
import "@stylesheets/homepage.css";
import { useRouter } from "next/navigation";
import Lodaernewletter from "../components/Loadernewletter";
import Spline from "@splinetool/react-spline";
//Importing FontAwesome for Icons
import Image from 'next/image';
import Testimonial from "@components/Testmonial";
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
import Popup from "@components/Popup";

import { register } from '../utils/registerServiceWorker';

function HomePage({ theme,  setIsPopup,setMsg,setColor}) {
  const [loading, setLoading] = useState(false);
  const [blur, setBLur] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadSpline, setLoadSpline] = useState(false);
  const [visible, setVisible] = useState(false);
  const [splineKey, setSplineKey] = useState(0);
  const [Maintance,setMaintanance]=useState(false)
  const splineRef = useRef(null);
  let session = useSession();

  useEffect(() => {
    register();
  }, []);

  useEffect(() => {
    // Extract token from URL query parameters
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    if (token) {
      setShowModal(true);
      // Perform any actions you need with the token
    } else {
      // If no token, you can handle it accordingly
    }
  }, []);

async   function func() {
    if (session.status === "authenticated") {
      if (localStorage.getItem("count") == null) {
        localStorage.setItem("count", true);
        let d=await JSON.parse(localStorage.getItem('finalUser'))
        setMsg(`${d.name} !! Welcome`)
        setIsPopup(true)
      
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

  const handleDevopsForum=()=>{
    router.push("/devopsforum");
  }

  // Navigate to the /resources page when "Get started" button is clicked
  const handleGetStartedClick = () => {
    router.push("/resources");
  };
  const handleStartNowClick = () => {
    router.push("/blogs");
  };

  const [email, setEmail] = useState(""); // State to hold email input

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
      setMsg("Please enter a valid email address.")
        setIsPopup(true)
      
      setLoading(false);
      setBLur(false);

      return;
    }


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

      // Display success or failure message based on subscription result
      if (subscribeData.success) {
        setMsg("Subscribed Successfully")
        setIsPopup(true)
       setColor('green')
      } else {
        if (subscribeData.message === "User already subscribed") {
          setMsg("User is already subscribed")
        setIsPopup(true)
        } else {
          setMsg("Subscription failed")
        setIsPopup(true)
        }
      }
    } catch (error) {
      // Handle any errors that occur during the process
      setMsg("An error occurred. Please try again.")
        setIsPopup(true)
     
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
      } transition-colors duration-500 overflow-x-hidden md:overflow-x-auto`}
    >
      {
        Maintance?
        <Popup
          msg="This page is under development. We apologize for the inconvenience. Please check back soon."
          color="purple"
        
        />:<></>
      }
     
      {showModal && <Reset />}
      
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
          src="temp_bg.webp"
          alt="HelpOps-Hub"
          className="absolute top-[340px] max-2xl:top-[390px] max-2xl:text-black translate-y-[-200px] max-xl:hidden right-0 max-2xl:-right-12 w-[47%] transition-all duration-500 ease-in-out"
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
              } rounded-full max-sm:w-32 max-sm:px-3 max-sm:py-2 px-5 py-3 transition duration-500 transform hover:scale-105`}
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
            <div className="relative left-[45%] max-[620px]:left-[38%] group">
                <div
                className="text-black h-12 w-32 bg-white absolute z-10 text-lg flex justify-center items-center transition-transform duration-100 group-hover:scale-105 origin-left"
                 onClick={handleStartNowClick}
                 >
               Start Now
                 </div>
                <div className="h-12 w-32 absolute bg-gray-400 top-2 -left-2 z-0 transition-transform duration-100 group-hover:scale-105 origin-left"></div>
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
            <img src="i1.webp" className="w-14 rounded-full" alt="ask-questions" />
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
            <img src="i2.webp" className="w-14 rounded-full"  alt="receive ecpert help" />
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
            <img src="i4.webp" className="w-14 rounded-full"  alt="collaborate and learn" />
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
            <img src="i3.webp" className="w-14 rounded-full"  alt="save time" />
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
                    <img src="i1.webp" className="w-16 rounded-full"  alt="Ask questions" />
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
                    <img src="i2.webp" className="w-16 rounded-full" />
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
                    <img src="i4.webp" className="w-16 rounded-full"  alt="collaborate and learn" />
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
                    <img src="i3.webp" className="w-16 rounded-full"  alt="access resources" />
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

      <div className="flex items-center max-lg:flex-col max-lg:h-auto max-lg:justify-center max-sm:my-0 relative h-[600px] mt-16 mb-16 px-32 max-md:px-3">
        <div className="w-1/2 max-lg:w-3/4 max-md:w-full max-md:scale-75 mt-16 mb-8">
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
              <div className="text-black h-12 w-32 bg-white absolute z-10 text-2xl flex justify-center items-center" onClick={handleDevopsForum}>
                Let's Go
              </div>
              <div className="h-12 w-32 absolute bg-black top-1.5 -left-1.5 z-0"></div>
            </div>
          </div>
        </div>
      <div className=" w-1/2 max-lg:w-3/4 h-[700px] max-md:w-full max-md:h-[500px] max-md:scale-75 mt-8">
        <div className="relative h-full w-full flex items-center justify-center">
  <div className="profileCard_container relative p-14 border-2 border-dashed rounded-full border-spacing-4 border-gray-400/50">
    <button className="profile_item left-[55px] -top-[12px] absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
    <span className="block w-[65px] h-[65px] transition-all duration-500 rounded-full z-[2] bg-white p-1">
        
        <svg viewBox="0 0 128 128">
                <path fill="#1A1918" d="M126 64c0 34.2-27.8 62-62 62S2 98.2 2 64 29.8 2 64 2s62 27.8 62 62"></path><path fill="#FFF" d="M65 39.9l16 39.6-24.1-19.1L65 39.9zm28.5 48.7L68.9 29.2c-.7-1.7-2.1-2.6-3.8-2.6-1.7 0-3.2.9-3.9 2.6L34 94.3h9.3L54 67.5l32 25.9c1.3 1 2.2 1.5 3.4 1.5 2.4 0 4.5-1.8 4.5-4.4.1-.5-.1-1.2-.4-1.9z"></path>
                </svg>
          </span>
    </button>

    <button className="profile_item right-[45px] -top-[8px] absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
      <span className="block w-[60px] h-[60px] transition-all duration-500 rounded-full z-[2] bg-white p-1">
        
      <svg viewBox="0 0 128 128">
            <path fill="#326ce5" d="M63.556 1.912a8.51 8.44 0 0 0-3.26.826L15.795 24a8.51 8.44 0 0 0-4.604 5.725L.214 77.485a8.51 8.44 0 0 0 1.155 6.47 8.51 8.44 0 0 0 .484.672l30.8 38.296a8.51 8.44 0 0 0 6.653 3.176l49.394-.012a8.51 8.44 0 0 0 6.653-3.17l30.789-38.301a8.51 8.44 0 0 0 1.645-7.142l-10.996-47.76a8.51 8.44 0 0 0-4.604-5.726L67.682 2.738a8.51 8.44 0 0 0-4.126-.826z"></path><path fill="#fff" d="M63.975 18.143v.01c-1.472.014-2.664 1.336-2.664 2.972 0 .028.005.052.005.074-.002.222-.012.49-.005.684.035.946.24 1.668.365 2.535.17 1.42.215 2.547.224 3.687l.036-.164a40.909 40.909 0 0 0-.118-2.394c.139 1.228.24 2.364.186 3.392-.015-.325-.061-.677-.066-.982l-.036.164c.003.347.096.79.069 1.123-.061.29-.291.495-.467.742l-.025.121c.173-.227.354-.444.46-.699-.134.423-.42.796-.707 1.094.08-.124.146-.262.24-.385l.026-.12c-.145.203-.227.457-.385.61l-.006.006-.064 1.12a34.702 34.702 0 0 0-4.797.736 34.279 34.279 0 0 0-17.398 9.935c-.296-.202-.8-.56-.95-.672l-.005-.005-.01.002c-.478.064-.95.207-1.57-.153-1.187-.8-2.271-1.907-3.584-3.24-.601-.637-1.037-1.246-1.754-1.861-.163-.141-.41-.33-.592-.473a3.193 3.193 0 0 0-1.87-.705c-.825-.028-1.62.294-2.14.947-.925 1.16-.628 2.933.658 3.96l.04.026c.174.143.39.326.552.446.762.561 1.457.849 2.21 1.293 1.594.984 2.91 1.798 3.956 2.779.402.427.474 1.19.53 1.525v.008l.847.754c-4.561 6.874-6.675 15.36-5.432 24.006l-1.103.324-.004.006c-.295.381-.712.972-1.135 1.147-1.366.43-2.908.588-4.77.783-.872.073-1.626.031-2.556.207-.205.04-.49.112-.713.164l-.023.006-.04.011c-1.58.383-2.6 1.837-2.27 3.272.327 1.435 1.873 2.306 3.464 1.963l.039-.006h.002c.02-.005.038-.015.05-.018.22-.048.496-.101.69-.154.913-.245 1.574-.603 2.393-.916 1.76-.632 3.218-1.16 4.637-1.365.582-.046 1.204.362 1.517.537l.008.004 1.152-.197c2.674 8.274 8.266 14.96 15.346 19.162l-.48 1.152.003.01c.174.45.364 1.057.237 1.492-.516 1.336-1.4 2.749-2.408 4.326-.488.728-.99 1.295-1.43 2.131-.107.201-.24.507-.342.717-.69 1.475-.184 3.177 1.143 3.816 1.335.643 2.99-.036 3.707-1.513l.007-.008v-.01c.1-.207.242-.478.329-.674.378-.866.505-1.607.77-2.441h-.003c.706-1.773 1.094-3.627 2.059-4.778.26-.31.688-.432 1.136-.552l.01-.004.6-1.084a34.436 34.436 0 0 0 24.556.062c.172.303.478.865.563 1.01l.004.006.008.004c.458.149.948.223 1.35.816.722 1.237 1.218 2.703 1.822 4.475.265.832.397 1.575.775 2.441.087.2.23.475.33.684.715 1.482 2.375 2.163 3.713 1.52 1.326-.64 1.832-2.34 1.143-3.815-.102-.21-.243-.518-.348-.719-.441-.836-.943-1.397-1.43-2.125-1.01-1.577-1.843-2.885-2.36-4.222-.213-.685.036-1.104.206-1.555l.006-.014-.01-.01a.834.834 0 0 1-.09-.168 6.23 6.23 0 0 1-.12-.29c-.08-.21-.16-.442-.224-.596 7.358-4.35 12.786-11.285 15.34-19.295.347.054.93.155 1.12.193l.01.002.009-.004c.402-.265.76-.606 1.475-.549 1.419.205 2.876.734 4.638 1.366.817.312 1.479.677 2.393.921.194.052.47.101.69.149.012.003.029.012.05.017h.002l.04.004c1.59.341 3.137-.528 3.464-1.963.327-1.435-.691-2.888-2.272-3.269-.227-.052-.551-.141-.775-.184-.93-.176-1.683-.132-2.557-.205-1.86-.195-3.402-.353-4.77-.783-.547-.213-.942-.872-1.138-1.148l-.006-.006-1.066-.31a34.42 34.42 0 0 0-.56-12.425 34.497 34.497 0 0 0-4.983-11.525c.278-.252.785-.701.932-.836l.007-.006v-.01c.044-.48.006-.97.495-1.494 1.045-.98 2.364-1.797 3.957-2.779.754-.444 1.454-.731 2.214-1.293.174-.128.408-.328.588-.473 1.286-1.026 1.584-2.798.658-3.959-.925-1.16-2.718-1.267-4.003-.242-.182.145-.43.332-.594.473-.717.618-1.16 1.226-1.76 1.863-1.313 1.335-2.398 2.446-3.586 3.246-.507.294-1.258.193-1.603.172h-.008l-1.004.719c-5.775-6.048-13.63-9.916-22.09-10.672a63.543 63.543 0 0 1-.064-1.174v-.008l-.006-.006c-.35-.333-.76-.61-.864-1.318v-.002c-.115-1.428.077-2.967.3-4.824.125-.867.332-1.59.366-2.535.009-.216-.005-.527-.005-.758 0-1.645-1.203-2.982-2.688-2.982zm-3.514 13.7a34.663 34.663 0 0 0-3.59.552 34.618 34.618 0 0 1 3.59-.551zm-4.781.823a34.262 34.262 0 0 0-3.711 1.133 34.208 34.208 0 0 1 3.71-1.133zm-4.825 1.564a34.262 34.262 0 0 0-3.496 1.666 34.216 34.216 0 0 1 3.496-1.666zM28.8 35.377c.142.02.28.048.418.086a3.168 3.168 0 0 0-.418-.086zm.943.283c.132.064.259.137.38.219a3.168 3.168 0 0 0-.38-.219zm16.549.848a34.262 34.262 0 0 0-3.176 2.14 34.228 34.228 0 0 1 3.176-2.14zm14.346 2.344-.787 13.93-.057.029-.002.013c-.002.05-.014.095-.02.143a2.348 2.348 0 0 1-.263.857c-.038.07-.076.141-.121.207a2.348 2.348 0 0 1-.69.662c-.07.045-.147.08-.222.118a2.348 2.348 0 0 1-.873.226c-.045.003-.088.014-.133.014-.05 0-.094-.022-.143-.026a2.334 2.334 0 0 1-.943-.304c-.045-.026-.094-.041-.137-.069l-.006.022.004-.022c-.044-.027-.102-.016-.144-.047l-.012-.01-.022.014-11.421-8.097c.093-.091.192-.174.287-.264a27.438 27.438 0 0 1 3.23-2.635c.237-.165.473-.332.715-.49a27.438 27.438 0 0 1 3.816-2.078c.24-.107.487-.204.73-.305a27.438 27.438 0 0 1 4.044-1.312c.12-.03.238-.067.36-.094.576-.13 1.162-.206 1.745-.299l.006-.025a28.076 28.076 0 0 1 .004 0l-.006.025c.355-.056.704-.14 1.06-.183zm6.726.002c.197.024.39.068.586.097a27.668 27.668 0 0 1 3.16.656c.412.111.82.23 1.225.36a27.668 27.668 0 0 1 3.033 1.168c.375.17.745.348 1.112.535a27.668 27.668 0 0 1 2.83 1.662c.344.23.68.47 1.015.717a27.668 27.668 0 0 1 2.496 2.074c.144.134.297.257.438.395l-11.346 8.044-.04-.015-.01.008c-.045.032-.094.045-.14.074a2.35 2.35 0 0 1-.882.334c-.077.012-.153.03-.23.033a2.35 2.35 0 0 1-.99-.176 2.34 2.34 0 0 1-.265-.127 2.35 2.35 0 0 1-.746-.65c-.05-.069-.088-.146-.13-.22a2.35 2.35 0 0 1-.288-.887c-.006-.055-.026-.103-.03-.159v-.011l-.011-.006zm-25.238.576a34.262 34.262 0 0 0-2.81 2.576 34.228 34.228 0 0 1 2.81-2.576zm50.916 8.14a34.483 34.483 0 0 1 1.522 2.594 34.478 34.478 0 0 0-1.522-2.594zm1.994 3.508c.488.993.927 2.01 1.317 3.045a34.478 34.478 0 0 0-1.317-3.045zm-54.576.69 10.43 9.328-.012.056.01.008c.94.817 1.07 2.23.293 3.203-.028.035-.068.057-.098.09a2.348 2.348 0 0 1-.986.65c-.043.015-.078.043-.121.055l-.014.002-.012.047-13.367 3.86c-.02-.185-.02-.37-.037-.555a27.432 27.432 0 0 1-.092-3.344c.013-.387.033-.773.063-1.158a27.432 27.432 0 0 1 .457-3.307c.08-.407.173-.812.273-1.215a27.432 27.432 0 0 1 .99-3.162c.14-.37.29-.734.448-1.097a27.432 27.432 0 0 1 1.51-2.987c.09-.156.17-.32.265-.474zm47.002.007c.097.158.176.324.27.483a27.774 27.774 0 0 1 1.53 3.01c.15.346.298.694.434 1.046a27.774 27.774 0 0 1 1.04 3.288c.045.175.104.346.144.523.69 3.002.86 5.999.578 8.896l-13.434-3.87-.011-.057-.014-.004c-.045-.012-.084-.034-.127-.049a2.35 2.35 0 0 1-.79-.455c-.058-.052-.116-.103-.17-.16a2.35 2.35 0 0 1-.491-.824c-.027-.078-.044-.158-.063-.239a2.35 2.35 0 0 1-.03-.892c.009-.049.01-.096.02-.145.01-.045.038-.084.05-.129a2.329 2.329 0 0 1 .599-.996c.034-.033.054-.076.09-.107l.01-.01-.006-.03 10.37-9.279zm9.228 3.305c.332.965.619 1.945.864 2.938a34.478 34.478 0 0 0-.864-2.938zm-34.824 6.752h4.262l2.65 3.314-.95 4.133-3.83 1.84-3.837-1.848-.953-4.132zm13.727 11.395c.18-.01.357.008.533.04l.014.003.023-.03 13.828 2.338c-.064.18-.147.351-.215.53a27.466 27.466 0 0 1-1.36 3.011c-.19.363-.386.721-.593 1.074a27.466 27.466 0 0 1-1.853 2.768c-.243.32-.492.633-.748.941a27.466 27.466 0 0 1-2.29 2.432c-.29.274-.588.54-.892.8a27.466 27.466 0 0 1-2.64 2.012c-.16.107-.31.225-.471.329l-5.365-12.967.015-.022-.004-.011c-.02-.045-.026-.092-.043-.137a2.351 2.351 0 0 1-.135-.889c.004-.081.006-.162.018-.242a2.351 2.351 0 0 1 .334-.89c.045-.072.098-.137.15-.204a2.351 2.351 0 0 1 .68-.578c.043-.024.079-.055.123-.076.289-.139.59-.218.89-.232zm-23.31.056.013.002c.03 0 .06.008.092.01a2.349 2.349 0 0 1 1.226.445c.07.05.133.101.196.158a2.349 2.349 0 0 1 .689 1.106c.008.03.022.059.03.09.11.479.065.98-.13 1.431l-.005.012.04.05-5.31 12.837c-.155-.1-.3-.212-.451-.315a27.58 27.58 0 0 1-2.64-2.011 27.508 27.508 0 0 1-.891-.803 27.58 27.58 0 0 1-2.272-2.408c-.26-.312-.513-.629-.76-.951a27.58 27.58 0 0 1-1.82-2.704 27.294 27.294 0 0 1-.627-1.123 27.58 27.58 0 0 1-1.346-2.947c-.07-.181-.154-.356-.22-.539l13.707-2.326.023.03.014-.005c.147-.027.294-.04.443-.039zm2.304 1.994a2.326 2.326 0 0 1 .02.344 2.286 2.286 0 0 0-.02-.344zm-.008.703a2.326 2.326 0 0 1-.1.4c.046-.13.077-.264.1-.4zm9.334 2.944c.058-.002.114.013.172.015a2.32 2.32 0 0 1 .752.159c.054.021.112.03.164.056v.002a2.31 2.31 0 0 1 1.043.99l.006.012h.053l6.757 12.213c-.276.092-.557.173-.836.256a28.056 28.056 0 0 1-.996.277c-.283.074-.564.15-.85.215-.124.029-.25.046-.376.072a27.542 27.542 0 0 1-4.18.561c-.28.016-.558.035-.838.043a27.542 27.542 0 0 1-4.32-.223c-.28-.036-.56-.085-.838-.13a27.542 27.542 0 0 1-4.055-.975c-.127-.041-.257-.072-.384-.115l6.742-12.188h.01l.007-.012c.026-.048.065-.085.094-.13a2.351 2.351 0 0 1 .606-.647c.083-.06.168-.115.26-.164a2.351 2.351 0 0 1 .85-.262c.054-.005.103-.023.157-.025zM52.297 98.69a34.413 34.413 0 0 0 3.758 1.137 34.352 34.352 0 0 1-3.758-1.137zm23.385.09c-1.07.381-2.156.709-3.258.983a34.56 34.56 0 0 0 3.258-.983zm-4.575 1.281a34.399 34.399 0 0 1-3.718.563 34.413 34.413 0 0 0 3.718-.563zm-13.937.016a34.413 34.413 0 0 0 3.898.572 34.358 34.358 0 0 1-3.898-.572zm8.91.649a34.36 34.36 0 0 1-3.851.005 34.413 34.413 0 0 0 3.85-.005z"></path>
            </svg>
      </span>
    </button>

    <button className="profile_item -left-8 top-20 absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
    <span className="block w-[65px] h-[65px] transition-all duration-500 rounded-full z-[2] bg-white p-1">     
    <svg viewBox="0 0 128 128">   
            <path fill="#252f3e" d="M36.379 53.64c0 1.56.168 2.825.465 3.75.336.926.758 1.938 1.347 3.032.207.336.293.672.293.969 0 .418-.254.84-.8 1.261l-2.653 1.77c-.379.25-.758.379-1.093.379-.422 0-.844-.211-1.266-.59a13.28 13.28 0 0 1-1.516-1.98 34.153 34.153 0 0 1-1.304-2.485c-3.282 3.875-7.41 5.813-12.38 5.813-3.535 0-6.355-1.012-8.421-3.032-2.063-2.023-3.114-4.718-3.114-8.086 0-3.578 1.262-6.484 3.833-8.671 2.566-2.192 5.976-3.286 10.316-3.286 1.43 0 2.902.125 4.46.336 1.56.211 3.161.547 4.845.926v-3.074c0-3.2-.676-5.43-1.98-6.734C26.061 32.633 23.788 32 20.546 32c-1.473 0-2.988.168-4.547.547a33.416 33.416 0 0 0-4.547 1.433c-.676.293-1.18.461-1.473.547-.296.082-.507.125-.675.125-.59 0-.883-.422-.883-1.304v-2.063c0-.676.082-1.18.293-1.476.21-.293.59-.586 1.18-.883 1.472-.758 3.242-1.39 5.304-1.895 2.063-.547 4.254-.8 6.57-.8 5.008 0 8.672 1.136 11.032 3.41 2.316 2.273 3.492 5.726 3.492 10.359v13.64Zm-17.094 6.403c1.387 0 2.82-.254 4.336-.758 1.516-.508 2.863-1.433 4-2.695.672-.8 1.18-1.684 1.43-2.695.254-1.012.422-2.23.422-3.665v-1.765a34.401 34.401 0 0 0-3.871-.719 31.816 31.816 0 0 0-3.961-.25c-2.82 0-4.883.547-6.274 1.684-1.387 1.136-2.062 2.734-2.062 4.84 0 1.98.504 3.453 1.558 4.464 1.012 1.051 2.485 1.559 4.422 1.559Zm33.809 4.547c-.758 0-1.262-.125-1.598-.422-.34-.254-.633-.84-.887-1.64L40.715 29.98c-.25-.843-.38-1.39-.38-1.687 0-.672.337-1.05 1.013-1.05h4.125c.8 0 1.347.124 1.644.421.336.25.59.84.84 1.64l7.074 27.876 6.57-27.875c.208-.84.462-1.39.797-1.64.34-.255.93-.423 1.688-.423h3.367c.8 0 1.348.125 1.684.422.336.25.633.84.8 1.64l6.653 28.212 7.285-28.211c.25-.84.547-1.39.84-1.64.336-.255.887-.423 1.644-.423h3.914c.676 0 1.055.336 1.055 1.051 0 .21-.043.422-.086.676-.043.254-.125.59-.293 1.05L80.801 62.57c-.254.84-.547 1.387-.887 1.64-.336.255-.883.423-1.598.423h-3.62c-.801 0-1.348-.13-1.684-.422-.34-.297-.633-.844-.801-1.684l-6.527-27.16-6.485 27.117c-.21.844-.46 1.391-.8 1.684-.337.297-.926.422-1.684.422Zm54.105 1.137c-2.187 0-4.379-.254-6.484-.758-2.106-.504-3.746-1.055-4.84-1.684-.676-.379-1.137-.8-1.305-1.18a2.919 2.919 0 0 1-.254-1.18v-2.148c0-.882.336-1.304.97-1.304.25 0 .503.043.757.129.25.082.629.25 1.05.418a23.102 23.102 0 0 0 4.634 1.476c1.683.336 3.324.504 5.011.504 2.653 0 4.715-.465 6.145-1.39 1.433-.926 2.191-2.274 2.191-4 0-1.18-.379-2.145-1.136-2.946-.758-.8-2.192-1.516-4.254-2.191l-6.106-1.895c-3.074-.969-5.348-2.398-6.734-4.293-1.39-1.855-2.106-3.918-2.106-6.105 0-1.77.38-3.328 1.137-4.676a10.829 10.829 0 0 1 3.031-3.453c1.262-.965 2.696-1.684 4.38-2.188 1.683-.504 3.452-.715 5.304-.715.926 0 1.894.043 2.82.168.969.125 1.852.293 2.738.461.84.211 1.641.422 2.399.676.758.254 1.348.504 1.77.758.59.336 1.011.672 1.261 1.05.254.34.379.802.379 1.391v1.98c0 .884-.336 1.348-.969 1.348-.336 0-.883-.171-1.597-.507-2.403-1.094-5.098-1.641-8.086-1.641-2.399 0-4.293.379-5.598 1.18-1.309.797-1.98 2.02-1.98 3.746 0 1.18.421 2.191 1.261 2.988.844.8 2.403 1.602 4.633 2.316l5.98 1.895c3.032.969 5.22 2.316 6.524 4.043 1.305 1.727 1.938 3.707 1.938 5.895 0 1.812-.38 3.453-1.094 4.882-.758 1.434-1.77 2.696-3.074 3.707-1.305 1.051-2.864 1.809-4.672 2.36-1.895.586-3.875.883-6.024.883Zm0 0"></path>
            <path fill="#f90" d="M118 73.348c-4.432.063-9.664 1.052-13.621 3.832-1.223.883-1.012 2.062.336 1.894 4.508-.547 14.44-1.726 16.21.547 1.77 2.23-1.976 11.62-3.663 15.79-.504 1.26.59 1.769 1.726.8 7.41-6.231 9.348-19.242 7.832-21.137-.757-.925-4.388-1.79-8.82-1.726zM1.63 75.859c-.927.116-1.347 1.236-.368 2.121 16.508 14.902 38.359 23.872 62.613 23.872 17.305 0 37.43-5.43 51.281-15.66 2.273-1.688.297-4.254-2.02-3.204-15.534 6.57-32.421 9.77-47.788 9.77-22.778 0-44.8-6.273-62.653-16.633-.39-.231-.755-.304-1.064-.266z">
            </path>
        </svg>
      </span>
    </button>

    <button className="profile_item -right-8 top-20 absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
      <span className="block w-[65px] h-[65px] transition-all duration-500 rounded-full z-[2] bg-white p-1">
        
      <svg viewBox="0 0 128 128">
            <path fill="#E24329" d="m124.755 51.382-.177-.452L107.47 6.282a4.459 4.459 0 0 0-1.761-2.121 4.581 4.581 0 0 0-5.236.281 4.578 4.578 0 0 0-1.518 2.304L87.404 42.088H40.629L29.077 6.746a4.492 4.492 0 0 0-1.518-2.31 4.581 4.581 0 0 0-5.236-.281 4.502 4.502 0 0 0-1.761 2.121L3.422 50.904l-.17.452c-5.059 13.219-.763 28.192 10.537 36.716l.059.046.157.111 26.061 19.516 12.893 9.758 7.854 5.93a5.283 5.283 0 0 0 6.388 0l7.854-5.93 12.893-9.758 26.218-19.634.065-.052c11.273-8.526 15.562-23.472 10.524-36.677z"></path><path fill="#FC6D26" d="m124.755 51.382-.177-.452a57.79 57.79 0 0 0-23.005 10.341L64 89.682c12.795 9.68 23.934 18.09 23.934 18.09l26.218-19.634.065-.052c11.291-8.527 15.586-23.488 10.538-36.704z"></path><path fill="#FCA326" d="m40.066 107.771 12.893 9.758 7.854 5.93a5.283 5.283 0 0 0 6.388 0l7.854-5.93 12.893-9.758s-11.152-8.436-23.947-18.09a18379.202 18379.202 0 0 0-23.935 18.09z"></path><path fill="#FC6D26" d="M26.42 61.271A57.73 57.73 0 0 0 3.422 50.904l-.17.452c-5.059 13.219-.763 28.192 10.537 36.716l.059.046.157.111 26.061 19.516L64 89.655 26.42 61.271z"></path>
            </svg>
      </span>
    </button>

    <button className="profile_item bottom-8 -left-4 absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
      <span className="block w-[65px] h-[65px] transition-all duration-500 rounded-full z-[2] bg-white p-1">
        
      <svg viewBox="0 0 128 128">
            <path fillRule="evenodd" clipRule="evenodd" fill="#3A4D54" d="M73.8 50.8h11.3v11.5h5.7c2.6 0 5.3-.5 7.8-1.3 1.2-.4 2.6-1 3.8-1.7-1.6-2.1-2.4-4.7-2.6-7.3-.3-3.5.4-8.1 2.8-10.8l1.2-1.4 1.4 1.1c3.6 2.9 6.5 6.8 7.1 11.4 4.3-1.3 9.3-1 13.1 1.2l1.5.9-.8 1.6c-3.2 6.2-9.9 8.2-16.4 7.8-9.8 24.3-31 35.8-56.8 35.8-13.3 0-25.5-5-32.5-16.8l-.1-.2-1-2.1c-2.4-5.2-3.1-10.9-2.6-16.6l.2-1.7h9.6V50.8h11.3V39.6h22.5V28.3h13.5v22.5z"></path><path fill="#00AADA" d="M110.4 55.1c.8-5.9-3.6-10.5-6.4-12.7-3.1 3.6-3.6 13.2 1.3 17.2-2.8 2.4-8.5 4.7-14.5 4.7H18.6c-.6 6.2.5 11.9 3 16.8l.8 1.5c.5.9 1.1 1.7 1.7 2.6 3 .2 5.7.3 8.2.2 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5 1.1-8.3 1.3h-.6c-1.3.1-2.7.1-4.2.1-1.6 0-3.1 0-4.9-.1 6 6.8 15.4 10.8 27.2 10.8 25 0 46.2-11.1 55.5-35.9 6.7.7 13.1-1 16-6.7-4.5-2.7-10.5-1.8-13.9-.1z"></path><path fill="#28B8EB" d="M110.4 55.1c.8-5.9-3.6-10.5-6.4-12.7-3.1 3.6-3.6 13.2 1.3 17.2-2.8 2.4-8.5 4.7-14.5 4.7h-68c-.3 9.5 3.2 16.7 9.5 21 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5.2 1.2-8.5 1.4l-.1-.1c8.5 4.4 20.8 4.3 35-1.1 15.8-6.1 30.6-17.7 40.9-30.9-.2.1-.4.1-.5.2z"></path><path fill="#028BB8" d="M18.7 71.8c.4 3.3 1.4 6.4 2.9 9.3l.8 1.5c.5.9 1.1 1.7 1.7 2.6 3 .2 5.7.3 8.2.2 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5.2 1.2-8.5 1.4h-.4c-1.3.1-2.7.1-4.1.1-1.6 0-3.2 0-4.9-.1 6 6.8 15.5 10.8 27.3 10.8 21.4 0 40-8.1 50.8-26H18.7v-.1z"></path><path fill="#019BC6" d="M23.5 71.8c1.3 5.8 4.3 10.4 8.8 13.5 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5.2 1.2-8.6 1.4 8.5 4.4 20.8 4.3 34.9-1.1 8.5-3.3 16.8-8.2 24.2-14.1H23.5z"></path><path fillRule="evenodd" clipRule="evenodd" fill="#00ACD3" d="M28.4 52.7h9.8v9.8h-9.8v-9.8zm.8.8h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm3-12h9.8v9.8h-9.8v-9.8zm.9.8h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z"></path><path fillRule="evenodd" clipRule="evenodd" fill="#23C2EE" d="M39.6 52.7h9.8v9.8h-9.8v-9.8zm.9.8h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z"></path><path fillRule="evenodd" clipRule="evenodd" fill="#00ACD3" d="M50.9 52.7h9.8v9.8h-9.8v-9.8zm.8.8h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z"></path><path fillRule="evenodd" clipRule="evenodd" fill="#23C2EE" d="M50.9 41.5h9.8v9.8h-9.8v-9.8zm.8.8h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm3.1 10.4H72v9.8h-9.8v-9.8zm.8.8h.8v8.1H63v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z"></path><path fillRule="evenodd" clipRule="evenodd" fill="#00ACD3" d="M62.2 41.5H72v9.8h-9.8v-9.8zm.8.8h.8v8.1H63v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z"></path><path fillRule="evenodd" clipRule="evenodd" fill="#23C2EE" d="M62.2 30.2H72V40h-9.8v-9.8zm.8.8h.8v8.1H63V31zm1.5 0h.8v8.1h-.8V31zm1.4 0h.8v8.1h-.8V31zm1.5 0h.8v8.1h-.8V31zm1.5 0h.8v8.1h-.8V31zm1.5 0h.8v8.1h-.8V31z"></path><path fillRule="evenodd" clipRule="evenodd" fill="#00ACD3" d="M73.5 52.7h9.8v9.8h-9.8v-9.8zm.8.8h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z"></path><path fillRule="evenodd" clipRule="evenodd" fill="#D4EEF1" d="M48.8 78.3c1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7"></path><path fillRule="evenodd" clipRule="evenodd" fill="#3A4D54" d="M48.8 79.1c.2 0 .5 0 .7.1-.2.1-.4.4-.4.7 0 .4.4.8.8.8.3 0 .6-.2.7-.4.1.2.1.5.1.7 0 1.1-.9 1.9-1.9 1.9-1.1 0-1.9-.9-1.9-1.9 0-1 .8-1.9 1.9-1.9M1.1 72.8h125.4c-2.7-.7-8.6-1.6-7.7-5.2-5 5.7-16.9 4-20 1.2-3.4 4.9-23 3-24.3-.8-4.2 5-17.3 5-21.5 0-1.4 3.8-21 5.7-24.3.8-3 2.8-15 4.5-20-1.2 1.1 3.5-4.9 4.5-7.6 5.2"></path><path fill="#BFDBE0" d="M56 97.8c-6.7-3.2-10.3-7.5-12.4-12.2-2.5.7-5.5 1.2-8.9 1.4-1.3.1-2.7.1-4.1.1-1.7 0-3.4 0-5.2-.1 6 6 13.6 10.7 27.5 10.8H56z"></path><path fill="#D4EEF1" d="M46.1 89.9c-.9-1.3-1.8-2.8-2.5-4.3-2.5.7-5.5 1.2-8.9 1.4 2.3 1.2 5.7 2.4 11.4 2.9z"></path>
            </svg>         
      </span>
    </button>

    <button className="profile_item bottom-8 -right-4 absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
    <span className="block w-[65px] h-[65px] transition-all duration-500 rounded-full z-[2] bg-white p-1">
        
    <svg viewBox="0 0 128 128">
            <g fill="#181616"><path fillRule="evenodd" clipRule="evenodd" d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"></path><path d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"></path></g>
            </svg>
      </span>
    </button>

    <button className="profile_item right-[40%] -bottom-8 absolute rounded-full bg-cover cursor-pointer border border-gray-400/50 p-[2px] active:scale-95 hover:scale-95 transition-all duration-500">
    <span className="block w-[65px] h-[65px] transition-all duration-500 rounded-full z-[2] bg-white p-1">
        
    
    <svg viewBox="0 0 128 128">
            <path fill="#d33833" d="M108.893 61.68c0 25.36-20.099 45.918-44.892 45.918-24.794 0-44.893-20.558-44.893-45.918s20.1-45.92 44.893-45.92 44.892 20.56 44.892 45.92"></path><path fill="#ef3d3a" d="M20.938 73.052S17.688 25.167 61.81 23.8l-3.078-5.13-23.943 8.037-6.84 7.867-5.986 11.459-3.42 13.339 1.025 8.893"></path><path fill="#231f20" d="M33.253 30.355c-7.876 8.06-12.75 19.186-12.75 31.496 0 12.307 4.874 23.436 12.75 31.494 7.88 8.057 18.74 13.03 30.747 13.03 12.007 0 22.867-4.973 30.747-13.03 7.876-8.058 12.751-19.187 12.751-31.494 0-12.31-4.875-23.437-12.751-31.496C86.867 22.3 76.007 17.327 64 17.326c-12.006.001-22.867 4.973-30.747 13.03zM31.26 95.294c-8.37-8.561-13.546-20.392-13.546-33.443 0-13.053 5.176-24.883 13.546-33.444 8.37-8.563 19.954-13.87 32.74-13.869 12.788-.002 24.374 5.306 32.741 13.869 8.372 8.561 13.548 20.392 13.547 33.444 0 13.05-5.175 24.882-13.547 33.443-8.367 8.562-19.953 13.87-32.74 13.87-12.787 0-24.372-5.308-32.74-13.87"></path><path fill="#f0d6b7" d="m82.898 61.934-6.841 1.026-9.235 1.026-5.986.171-5.815-.17-4.446-1.369-3.934-4.275-3.078-8.722-.684-1.881-4.105-1.368-2.394-3.934-1.71-5.644 1.881-4.96 4.446-1.538 3.592 1.71 1.71 3.762 2.053-.342.683-.855-.683-3.933-.172-4.96 1.026-6.84-.04-3.908 3.119-4.985 5.472-3.934 9.578-4.104 10.603 1.539 9.235 6.67 4.276 6.84 2.736 4.96.684 12.313-2.053 10.604-3.762 9.405-3.591 4.96"></path><path fill="#335061" d="m88.027 56.975-4.103 4.105v15.904l-3.58 14.66-1.721.047 1.367 16.418 6.498-.855L84.95 91.52l-2.902.079 7.863-.422s3.932-9.919 3.932-10.432c0-.513 3.422-14.365 3.422-14.365l-7.698-8.037-1.539-1.37zm-41.215 2.564-4.275 1.711-13.682 9.406.856 2.737 3.934 11.628 1.709 19.327 1.197 2.05 17.101 5.817 1.028-1.2-2.053-14.365v-4.103l24.455-1.027 1.88-1.026-14.876-7.012 2.736-5.3-3.933 1.367-1.54-1.881-2.052-8.893-1.711-.513-3.762-1.198-3.25-2.906-3.761-4.619z"></path><path fill="#6d6b6d" d="m36.551 31.835 4.446-1.54 3.592 1.711 1.71 3.762 2.053-.342.513-2.052-1.026-3.933 1.026-9.407-.856-5.13 3.079-3.592 6.67-5.301-1.882-2.565-9.406 4.617-3.933 3.079-2.224 4.788-3.42 4.617-1.026 5.473.684 5.815"></path><path fill="#dcd9d8" d="M59.445 4.021c-1.172-.012-2.543.108-2.543.108L45.787 8.406l-4.277 4.276-1.881 3.42 3.934-.342s2.565-6.328 12.826-9.406c6.413-1.924 5.01-2.312 3.056-2.333zM48.01 14.904l-9.406 2.223-2.737 8.893.684 5.814 1.88-1.195s-3.591-11.974 10.09-13.684l-.511-2.05z"></path><path fill="#f7e4cd" d="M69.986.475a11.318 11.318 0 0 0-3.85.748c-10.26 3.933-17.785 11.115-17.615 15.732.292 7.864.172 7.87.172 7.87S51.601 9.774 66.31 6.866c12.108-2.393 18.468.512 20.863 3.248 0 0-8.25-9.82-17.186-9.64zm18.328 11.35c-.545-.003-4.913.108-5.074 4.277 0 0 0 .683.342 1.367 0 0 3.934-4.447 6.328-2.053l-1.539-3.59s-.02-.002-.057-.002zm-25.185 2.01c-.84.02-1.876.371-3.149 1.24-3.762 2.565-3.42 6.157-2.736 6.841.684.684.499 2.06 1.02 1.115.52-.945.349-4.022 2.23-4.877 1.881-.855 4.966-1.812 6.16-.222 0 0-.522-4.166-3.525-4.096zm26.437 10.476s-2.818.594-3.078 3.078c-.26 2.483 3.079.512 3.592.341l-.514-3.42zm-20.693.171s-3.762.513-3.762 2.907 4.276 2.223 5.473 1.197l-1.711-4.104zM38.432 30.64 34.5 34.742l.684 5.131 2.05 5.3 2.225.686c-3.25-3.933-1.711-6.671-1.027-10.433.683-3.763 7.183.172 7.183.172l-.172-2.567-2.564-2.05-4.447-.342zm38.609 7.847c-1.126-.05-1.556 3.635-1.648 4.586.31-.92 3.171-2.77 3.171-2.77s0-1.396-1.396-1.794a.549.549 0 0 0-.127-.022zm-1.648 4.586a.394.394 0 0 0-.02.221s.006-.08.02-.22zm-29.248 1.301-2.24 2.17.513 7.525 5.473 8.551s6.143 1.386 5.472.856c-7.353-5.815-7.866-16.59-8.037-17.788-.17-1.196-1.181-1.314-1.181-1.314zm19.244 2.549c-.675.01-1.122.228-1.248.396-.427.57.457 3.672.457 3.672l.855.172c-.17-3.421 1.881-3.764 1.881-3.764-.758-.364-1.42-.484-1.945-.476z"></path><path fill="#49728b" d="m45.615 59.37-16.76 11.286 1.881 5.303 4.448 19.152.17 10.092 2.394.854c3.42-8.21-3.248-34.717-3.248-34.717l16.074-7.182-4.959-4.789zm6.614 19.448-.458 1.073s-.341 3.078-.341 3.933c0 .856.341 8.04.341 8.04h2.737V81.601l-2.28-2.784zm.056 14.584-7.695.342 2.222 1.54 5.473.855v-2.737zm35.742-36.427-3.248 3.591L96.75 69.46l.342-4.104-9.065-8.38zm-3.42 33.52-5.984 1.196.854 4.79c2.223 1.026 5.986-1.711 5.986-1.711l-.856-4.276z"></path><path fill="#fff" d="M50.574 62.62v1.538l2.174 2.395 6.84 3.078.172-5.129-4.739-.516-4.447-1.367zm50.059 24.284-5.473 1.711-5.25 2.563-2.789-.51-2.172.853 1.832 14.368 6.668-1.883 12.656-.684 1.881-5.814-3.42-10.09-3.933-.514zm-22.01 4.787-9.97.002-16.026.854.291 7.869 1.762 10.6 3.54 14.369 7.866 1.709 12.998-1.026.17-2.566-1.54-13.852.909-17.959zm1.317-1.366-3.763-9.577-3.934-5.644s.855-2.394 2.053-2.394h3.933l3.762 1.368-.341 6.328-1.71 9.92"></path><path fill="#dcd9d8" d="m52.115 65.014-.513.685 2.908 2.051 4.787 1.025-.17-2.05c-1.71.513-7.012-1.711-7.012-1.711zm23.77 7.353-3.932.512 6.67 15.734 1.367.172.684-1.71s-4.79-9.236-4.79-10.604c0 0 .856-2.052 2.053-1.54 1.198.514 3.764 1.882 3.764 1.882v-3.249l-5.816-1.197zm16.248 17.957-2.223.854 1.881 9.406c-.684-.171-5.13 1.883-5.13 1.883l.51 2.736 1.884-.685 5.984-.854 1.711 2.223 5.13.17 3.079-.684 2.736-4.103-.172-3.08-1.88-5.473c.513 4.104-1.54 8.039-1.54 8.039-.855 0-10.431-.514-10.431-.514 0-1.026-1.54-9.918-1.54-9.918zm-13.17.17-2.565 1.027s-.854 17.787 1.711 30.442c0 0-5.13 3.249-12.656 4.103l14.365-.513 1.711-1.026-2.052-28.047-.514-5.986zm4.47 18.297c-.736.004-1.83.526-2.603.475-.113 2.701.266 7.033.393 9.867 1.796.002 2.565-.392 3.906-.844.151-3.335-1.057-6.422-1.404-9.467a1.105 1.105 0 0 0-.291-.031z"></path><path fill="#d33833" d="M84.777 63.818c-2.192.102-5.148 2.897-6.525 3.387.178.512.47.917.492 1.57.965-.238 2.14-.075 2.977.336-.968.108-2.038.102-2.678.563-.235.677.055 1.6-.102 2.54 2.296.648 4.919.994 7.82 1.079.566-.733.758-2.133.69-3.518-.08-1.67-.519-5.104-1.55-5.705-.34-.197-.718-.27-1.124-.252zm-22.535.748c-2.324.05-2.082 4.108-1.969 6.592.095 2.098 1.188 4.318 1.66 5.713.224.65.274 1.342.83 1.47.984.23 4.23-1.067 5.155-1.571 1.955-1.066 3.473-2.76 5.133-3.897l.062-1.658c-.998-.498-2.15-.852-3.617-.916.995-.5 2.457-.493 3.363-1.088l.026-.662c-1.654-.127-2.285-.864-3.375-1.461-1.784-.974-4.464-2.037-6.768-2.477a2.4 2.4 0 0 0-.5-.045zm13.43 3.457c-.442.004-.969.171-1.57.573-.114 1.259.18 1.67.433 3.115 3.493 1.093 3.525-3.704 1.137-3.688z"></path><path fill="#ef3d3a" d="m84.557 62.621-6.498 3.762-.344 1.88v3.762l2.394.856s-1.197-1.71-.341-2.223c.855-.513 1.711 0 2.224-.855.513-.856 0-1.369.17-2.395.171-1.026 1.026-1.196 1.881-1.367.855-.17 3.25-.513 3.592.342l-1.026-3.078zm-21.536 1.03c-.847-.018-1.619.122-2.185.507-4.021 2.735-.78 9.056 1.19 12.774a551.56 551.56 0 0 0-.538-6.409c-.362-3.98.957-3.285 4.408-3.285.528 0 3.245.628 3.44 1.026.933 1.905-1.56 1.481 1.074 2.918 2.224 1.212 6.152-.737 5.254-3.432-.503-.6-2.62-.187-3.379-.58l-4.008-2.078c-1.168-.607-3.392-1.403-5.256-1.442Zm-.996 13.28c.042.532.086 1.063.127 1.594l.612-.183c-.204-.405-.46-.883-.739-1.41z"></path><path fill="#231f20" d="M67.565.006c-3.59.068-7.101.665-10.027 1.742-2.175.8-4.282 1.516-6.192 2.638-5.111 3-10.537 5.008-12.052 11.047-3.734 1.672-4.86 6.451-4.672 11.997.036 1.081.623 2.432.42 3.449-.104.516-.804 1.177-.944 1.513-1.79 4.267-.355 9.876 1.713 12.909 1.25 1.832 3.32 3.457 6.05 3.888.109 1.635.502 3.042 1.257 4.699.478 1.048 2.263 2.932 1.606 4.269-.33.674-3.237 2.137-4.201 2.716-3.255 1.952-5.614 3.149-8.619 5.312-1.944 1.4-4.985 1.58-4.505 4.808.323 2.178 1.563 4.878 2.272 7.062.768 2.357 1.868 4.516 2.5 6.962 1.405 5.451 1.698 10.587 2.04 15.911.134 2.085-.088 4.291.453 5.442.558 1.19 2.626 1.57 4.12 2.264 4.315 1.995 8.893 5.042 14.552 4.437 1.349 4.536 2.624 9.367 4.243 13.34 5.803 2.086 14.964 1.76 20.997 1.035 1.834-.222 3.769-1.127 4.2-2.717-.129-.98-.272-1.95-.21-3.109 1.886-.39 4.453-.712 4.868-2.8.582-2.928-1.849-7.123-1.038-10.336 1.092-.354 2.258-.631 2.084-2.355 1.84-.958 4.023-1.172 6.353-1.082.3.58.727 1.138 1.111 1.457 3.264.656 6.425.71 9.135-.174 3.067-1.002 4.53-7.275 3.829-10.26-.498-2.115-1.624-5.58-2.584-7.628-2.601-5.56-10.353-2.07-14.502-.008 2.013-5.295 3.744-10.785 5.52-16.725.53-1.78 1.578-4.303 1.343-6.147-.22-1.734-2.924-3.556-4.347-4.93-.791-.762-4.479-3.562-4.693-4.61-.207-1.014 1.504-3.311 2.054-4.46.79-1.644 1.356-3.656 1.745-5.025 2.9-10.196 3.195-24.204-.951-32.586-1.57-3.175-5.96-7.56-8.705-9.637C79.74 1.254 73.546-.106 67.565.006Zm.478 2.84C72.89 2.799 78.28 4.509 81.93 6.568c3.05 1.72 5.3 5.048 7.446 7.817-3.009-.893-5.57.642-5.103 3.124 2.519-2.309 6.822-.025 8.095 2.528 1.217 2.44 1.209 6.057 1.396 9.685.453 8.798-1.61 17.875-6.031 24.234-1.182 1.698-2.174 3.554-3.836 4.723-4.006 2.813-10.095 5.363-15.309 3.614-6.89-2.312-10.02-6.903-13.81-12.16.103 2.888 2.134 5.258 4.14 7.467 1.745 1.925 3.851 4.1 6.117 4.998-1.89-.444-4.792-.583-5.58 1.114-4.41-.293-8.508-.744-10.594-3.733-1.644-2.356-3.314-6.363-4.063-9.458-.153-.636-.415-1.99-.351-2.337.246-1.343 2.638-1.933 1.697-3.81-1.736-.016-2.127 1.58-3.72 1.738-4.125.408-7.035-5.467-6.848-9.012.159-3.014 2.707-5.898 6.192-5.517 2.463.27 3.3 2.958 3.778 5.35 1.42.076 3.471-.061 4.143-1.169-.097-2.703-1.352-4.871-1.266-7.355.162-4.668 2.705-8.88.743-13.478 2.1-4.764 8.261-8.524 12.818-10.797 1.765-.88 3.856-1.264 6.06-1.286zM55.505 5.192c.198.032.38.186.556.374-.03.811-.83.794-1.37 1.054-.84 1.033-2.068 1.516-3.09 2.648-1.049 1.16-2.222 4.276-3.612 4.62-.697.174-1.493-.12-2.1-.08-1.605.101-2.735.923-4.363 1.159 2.102-4.595 8.659-8.313 13.774-9.762a.468.468 0 0 1 .205-.013zm8.74 9.973c-2.637.003-5.64 2.822-6.423 4.973-.318.874-.82 2.59.441 2.895 1.413-3.149 3.729-6.185 8.39-5.1.895-1.471-.705-2.552-1.887-2.73a3.477 3.477 0 0 0-.522-.038zm-16.656.48c1.802 4.586-1.293 10.036-.14 15.051.353 1.536 1.574 3.92-.376 3.972.051-4.37-5.37-7.143-9.455-4.574-.273-3.314-.746-7.973 1.514-10.459 2.085-2.296 4.959-3.725 8.457-3.99zm41.776 7.597c-.149 2.517.786 4.032 1.435 5.812-1.122.706-3.305.266-4.57.819-.09 3.723 5.76 1.888 6.65-.185-1.33-1.932-2.241-4.25-3.295-6.437l-.22-.01zm-20.325.057c-.692 1.964 1.188 5.298 2.242 6.984-1.373 1.333-3.842.226-5.679.14-1.753 2.769 3.423 3.29 5.644 2.634.608-.179 1.66-1.09 1.805-1.5.617-1.733-.627-2.493-1.267-3.117-1.42-1.384-1.746-3.31-2.745-5.141zm10.549 1.81c-.134-.018-.295.03-.488.17-.125 4.616 3.305 8.437 5.863 11.52 1.25 1.505 2.756 2.365 1.369 4.703-2.236.85-5.855 3.285-8.964 2.753-1.65-.282-1.278-2.155-1.87-3.173-1.138 1.497-.692 3.762.48 4.78 5.479.542 9.208-1.794 12.552-3.943-.133-.842 1.012-2.36.694-3.626-.11-.436-1.102-1.068-1.704-1.727-2.453-2.675-5.814-6.672-7.15-9.798-.12-.28-.201-1.583-.782-1.66zm-38.98 8.635c-1.267-.02-2.415.815-2.686 2.783.562-.368 1.015-1.415 2.028-.917-.89 1.737-.676 5.12.535 6.22-.007-2.062-.328-5.587 1.43-5.48 1.231.074 1.48 2.71 2.528 3.308.723-3.478-1.722-5.882-3.835-5.914zm50.051 10.36c-2.673 1.22-4.83 2.997-8.322 3.332-.169.577-.097 2.033-.004 2.99 4.567-.095 6.77-3.358 8.326-6.321zm-21.884 1.921c1.335 3.573 7.353 4.833 12.443 4.579-.008-1.058-.003-2.13-.215-2.998-3.96.116-9.315-.049-12.228-1.58zm-.553 2.858c-2.573.003-.403 1.434.033 1.994.902 1.16 1.96 3.139 3.608 4.015 2.598 1.38 7.758.801 9.63.04.692-.28 1.25-1.057 1.507-1.713-5.84.14-12.763.722-14.778-4.336zm19.436 9.83c2 1.611 3.208 3.127 5.126 4.85 1.04.933 3.088 2.051 3.295 3.56.115.842-.401 2.905-.591 3.852-.84 4.154-2.73 9.642-4.53 13.995-.654 1.582-1.28 3.56-2.143 3.902-2.364.936-5.233-.091-7.242 1.16 2.7-4.685 5.64-9.111 8.286-13.852-.403-.94-1.391-1.341-1.678-2.388 1.858-3.509 1.004-14.403-3.738-12.103.663-.974 2.404-1.778 3.215-2.976zm-41.724 2.48c.431-.17 3.577 3.923 4.042 4.255 2.55 1.81 5.716 3.24 8.677 4.653.181 1.359.6 3.12 1.338 5.476.813 2.602 1.484 6.274 4.922 4.398-.327 1.486-2.237 2.408-1.71 4.141.33 1.087 3.94 2.43 5.084 3.076 2.111 1.19 4.037 1.848 5.659 2.544-7.37.202-14.291.802-21.102 1.729-.816-1.264-.487-3.212-.573-5.225-.094-2.186.815-7.114-.044-7.42-.971-.345-1.153 1.623-1.188 2.057-.182 2.308 1.099 7.195-.164 9.958-1.382-.391-2.063-1.43-3.358-1.902-.508 1.6 1.052 1.677.892 2.693-.212 1.343-2.757.22-2.743 2.217 1.657.266 4.199-.515 5.97.232.463 5.433 1.207 10.581 2.022 16.352-7.048-.366-11.61-3.868-16.805-6.297-.323-11.49-2.154-23.41-6.688-33.14 4.756-3.67 10.078-7.552 15.77-9.796zm39.082 2.626c.316.015.613.094.884.252 1.032.602 1.471 4.036 1.551 5.706.067 1.385-.126 2.783-.69 3.517-2.902-.085-5.524-.43-7.82-1.078.157-.94-.135-1.865.1-2.543.639-.46 1.711-.452 2.678-.56-.836-.412-2.01-.575-2.975-.337-.023-.654-.316-1.058-.493-1.57 1.427-.509 4.554-3.496 6.765-3.387zm-5.2.127c-1.218.794-2.255 1.787-3.424 2.635-2.593.129-4.008-.179-5.913-1.668.03-.12.222-.066.23-.213 2.775 1.237 6.304-.504 9.106-.754zm-27.347.049c1.447 1.005 4.247.757 6.378 1.131.11.683-.442 1.58-.432 2.531-1.793-.11-7.427-2.16-5.946-3.662zm9.772.573c.155-.004.321.011.5.045 2.304.44 4.984 1.502 6.768 2.477 1.09.596 1.721 1.332 3.375 1.46-.007.22-.017.44-.025.662-.906.595-2.369.588-3.363 1.088 1.466.064 2.62.417 3.618.915l-.065 1.659c-1.661 1.137-3.178 2.83-5.133 3.896-.925.504-4.17 1.802-5.153 1.572-.557-.129-.607-.82-.83-1.47-.473-1.395-1.564-3.614-1.66-5.712-.113-2.485-.356-6.545 1.968-6.592zm13.294 3.463c.137-.011.267-.007.39.011 2.126.313 1.972 4.722-1.392 3.67-.253-1.444-.546-1.856-.433-3.115.542-.361 1.022-.533 1.435-.566zm1.936 5.014c1.218.13 2.182 1.81 3.92 1.7-.279 4.532-.133 9.08-1.398 13.232-2.357-4.322-3.744-9.54-6.795-13.217.322-.342.61-.721.926-1.071 1.382.578 2.284-.758 3.347-.644zm7.008 1.442c1.678-.013 3.052 1.084 3.807 2.297-2.364 4.05-4.626 8.208-7.43 11.78 1.175-3.458 1.679-9.245 1.857-13.657a4.222 4.222 0 0 1 1.766-.42zM71.71 76.03c2.8 3.554 4.504 8.125 6.38 12.537-4.432-1.336-8.96-3.504-12.844-5.702.762-3.304 3.75-5.016 6.464-6.835zm29.511 11.728c1.217.03 2.426 1.018 2.955 1.819.956 1.444 1.849 5.695 2.35 7.952.747 3.359-.932 6.629-3.603 7.277v.001c-1.944.472-4.926.596-6.199-.019 1.558-.851 3.899-.856 5.702-1.44-2.583-1.112-6.405-.064-9.511-.258-.375-3.835-.658-7.993-1.567-11.02 1.813-1.927 6.193-2.39 8.68-3.981a2.077 2.077 0 0 1 1.193-.331zm-.211 3.578c-3.183.094-5.67.937-7.09 2.938 2.583.165 4.443-2.408 7.09-2.938zm-12.54.785c.225.01.447.035.66.083 1.692 2.91 2.056 7.749 2 11.261-1.055.204-1.74.808-3.02.768-.327-4.001-1.256-8.208-1.638-12.02.61-.012 1.32-.12 1.997-.092zm-19.603.043c3.34-.054 6.58.142 9.385.726.685 4.453.43 8.845.93 13.21.662 5.808.166 12.434 1.3 17.876-6.173 1.913-14.59 1.728-21.574-.392-3.147-9.643-4.863-18.796-6.047-29.685 4.587-.858 10.437-1.645 16.006-1.735zm14.824.384c1.103 3.987 1.037 9.06 1.579 13.567-1.668.366-2.888.545-4.683.815-.357-4.682-.63-9.295-.566-13.971 1.272-.426 2.394-.4 3.67-.411zm14.486 2.296c-1.26.016-2.394.29-2.88 1.032 2.19.18 4.722-.17 6.88-.398-.984-.34-2.572-.653-4-.634zm-.361 3.24c-1.128.014-2.123.228-2.634.777 2.304.193 5.318.241 7.743.189-.983-.458-3.23-.99-5.11-.966zM83.098 108.82c.236-.037.45-.045.627.002.348 3.045 1.555 6.131 1.404 9.466-1.34.452-2.11.848-3.907.845-.126-2.834-.506-7.166-.392-9.868.662.044 1.561-.334 2.268-.445z"></path><path fill="#81b0c4" d="M84.48 74.486a4.225 4.225 0 0 0-1.767.42c-.178 4.412-.68 10.199-1.856 13.656 2.805-3.571 5.066-7.73 7.43-11.779-.756-1.213-2.129-2.31-3.807-2.297zM71.71 76.03c-2.714 1.82-5.7 3.532-6.463 6.836 3.884 2.198 8.412 4.365 12.844 5.701-1.876-4.41-3.58-8.982-6.381-12.537z"></path><path fill="#f0d6b7" d="M79.817 63.945c-1.218.795-2.255 1.787-3.424 2.636-2.593.128-4.008-.18-5.913-1.669.031-.12.223-.066.23-.213 2.775 1.237 6.304-.504 9.107-.754"></path><path fill="#1d1919" d="M79.135 76.728a.94.94 0 1 1-1.881 0 .94.94 0 0 1 1.881 0m.941 4.361a.94.94 0 1 1-1.882 0 .94.94 0 0 1 1.882 0"></path>
            </svg>         
      </span>
    </button>

    <button className="profile_item w-[200px] h-[200px] p-1 border-2 rounded-full hover:border-gray-400/50 cursor-pointer transition-all duration-500 z-0">
      <div className="w-full h-full flex items-center justify-center p-2 rounded-full active:scale-95 hover:scale-95 object-cover transition-all duration-500">
        <span className="w-20 h-20 inline-block">
          <img src="./HelpOps-H Fevicon.webp" className="w-full h-full object-cover rounded-full" />
        </span>
      </div>
    </button>
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
                <img src="b1.webp" alt="Cloud Icon" />
              </div>
              <div className="splide__slide">
                <img src="b2.webp" alt="Monitor Icon" />
              </div>
              <div className="splide__slide">
                <img src="b3.webp" alt="Pipeline Icon" />
              </div>
              <div className="splide__slide">
                <img src="b4.webp" alt="DevOps Icon" />
              </div>
              <div className="splide__slide">
                <img src="b5.webp" alt="Container Icon" />
              </div>
              <div className="splide__slide">
                <img src="b6.webp" alt="Tools Icon" />
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
              {/* <img
                src="HelpOps-H Fevicon.webp"
                alt="Logo"
                data-tilt
                className="h-20"
                draggable="false"
              /> */}
          <img
                src="HelpOps-H Fevicon.webp"
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
              {/* {error && <p className="error-message-desktop">{error}</p>} */}
            </div>
          </div>
        </div>
      </div>
      {/*Section: Testimonial*/}
      <div className="w-[95vw] mt-14 z-[50] max-sm:w-full mx-auto">

      <div className={`${theme ? "bg-gray-200" : "bg-[#26272b] text-white"
            } rounded-3xl mb-10 flex w-[90%] mx-auto shadow-lg max-[900px]:flex-col items-center align-center`}>

      <Testimonial theme={theme} />
      </div>
      </div>
    </div>
  );
}

export default HomePage;
