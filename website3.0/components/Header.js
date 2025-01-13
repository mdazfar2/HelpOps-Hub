"use client";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import "@stylesheets/header.css";
import Image from 'next/image';

//Importing TogleSwitch Component
import ToggleSwitch from "./ToggleSwitch";

//Importing AuthButton component
import AuthButton from "./AuthButton";
import { usePathname } from "next/navigation";
//Importing FontAwesome for Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faUserCircle,
  faUserLarge,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { Context } from "@context/store";
import { useRouter } from "next/navigation";
const Header = () => {
  const pathname = usePathname(); // Get current path
  const isAdmin = pathname && pathname.startsWith("/admin"); // Check if path starts with '/admin'
  const isBlogs = pathname && pathname.startsWith("/blogs"); // Check if path starts with '/blogs'
  const isProfile = pathname && pathname.startsWith("/profile"); // Check if path starts with '/profile'
  const isCreateBlog = pathname && pathname.startsWith("/createblog"); // Check if path starts with '/createblog'
  const isDevopsForum = pathname && pathname.startsWith("/devopsforum");
  const isPremium = pathname && pathname.startsWith("/infrawise");

  const isCreateForum = pathname && pathname.startsWith("/createforum");
  let { theme, isAdminShow, isLogin, setIsPopup, setMsg, setSearchedBlog } =
    useContext(Context);
  // State to manage mobile menu toggle
  const [isActive, setIsActive] = useState(false);
  // to set the status of show navbar or not
  const [show, setShow] = useState(true);
  let router = useRouter();
  let lastScrollTop = 0; // to keep the position of lastscroll

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop) {
        setShow(false);
      } else {
        setShow(true);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For negative scrolling
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Effect to load VanillaTilt library for logo animation
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.7.0/vanilla-tilt.min.js";
    script.onload = () => {
      // Initialize VanillaTilt on .logo elements
      VanillaTilt.init(document.querySelectorAll(".logo"), {
        max: 25,
        speed: 400,
      });
    };
    document.body.appendChild(script);
  }, []);

  // Function to toggle mobile menu visibility
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  // Effect to close mobile menu on window resize if screen width > 1024px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsActive(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  function handleValidate() {
    if (!isLogin) {
      setIsPopup(true);
      setMsg("Please login First ");
      return;
    }
    router.push("/createblog");
  }
  const handleSearchChange = (e) => {
    setSearchedBlog(e.target.value);
  };
  return (
    <div>
      <header
        className={`w-screen ${
          theme ? "bg-transparent" : "transition-all bg-transparent"
        } z-50 fixed top-0  transition-all overflow-hidden py-2 ${
          show ? "top-0" : "top-[-550px]"
        } ${isAdmin ? "hidden" : "block"} ${
          isBlogs || isCreateBlog || isProfile || isDevopsForum || isCreateForum 
            ? "hidden"
            : "block"
        }  `}
      >
        <nav className="flex justify-between flex-wrap items-center w-[90%] my-5 mx-auto">
          {/* Logo with VanillaTilt animation */}
          <Link href="/">
          <div data-tilt data-tilt-scale="1.1">
              <img
                src="HelpOps-H Fevicon.webp"
                alt="Logo"
                className="w-20 h-20 top-2 max-[400px]:relative max-[400px]:left-36"
                draggable="false"
              />
            </div>
          </Link>

          <div className="flex min-w-[70%] gap-[50px] justify-between max-xl:min-w-0 max-xl:justify-center items-center">
            {/* Main navigation links */}
            <ul
              className={`${
                theme
                  ? "bg-white shadow-gray-300"
                  : "bg-[#393838] shadow-[#000000a6]"
              } ${isPremium?"opacity-0":""} list-none flex gap-5 py-2 px-5 nav_links rounded-3xl flex-wrap justify-center shadow-md  justify-self-end max-xl:hidden transition-colors duration-500`}
            >
              <li
                className={`${
                  theme ? "text-black" : "text-white"
                } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left transition-colors duration-500`}
              >
                <Link href="/">Home</Link>
              </li>
              <li
                className={`${
                  theme ? "text-black" : "text-white"
                } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left transition-colors duration-500`}
              >
                <Link href="/about">About</Link>
              </li>
              <li
                className={`${
                  theme ? "text-black" : "text-white"
                } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left transition-colors duration-500`}
              >
                <Link href="/team">Team</Link>
              </li>
              <li
                className={`${
                  theme ? "text-black" : "text-white"
                } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left transition-colors duration-500`}
              >
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
            {/* Navigation actions (sponsor button and toggle switch) */}
            <div className={`${isPremium?"hidden":""} flex items-center gap-2 `}>
             {(isAdminShow ? (
                <a href="https://www.helpopshub.com/admin" target="_blank">
                  <button
                    className={`${
                      theme
                        ? "bg-gray-100/80 text-black hover:border-[1px] hover:border-whitesmoke"
                        : "bg-gray-100/80 text-black hover:bg-transparent hover:border-[1px] hover:border-white"
                    } rounded-2xl shadow-md shadow-black/20  text-xl cursor-pointer text-center transition-transform duration-500 ease-in-out w-30 p-2 hover:transform hover:translate-x-2.5 mr-5 max-[400px]:hidden`}
                    style={{ fontFamily: "ubuntu" }}
                  >
                    Admin
                  </button>
                </a>
              ) : (
                <a href="https://github.com/sponsors/mdazfar2">
                  <button
                    className={`${
                      theme
                        ? "bg-gray-100/80 text-black hover:border-[1px] hover:border-whitesmoke"
                        : "bg-[#000] text-white hover:bg-transparent hover:border-[1px] hover:border-white"
                    } rounded-2xl shadow-md shadow-black/20  text-xl cursor-pointer text-center transition-transform duration-500 ease-in-out w-30 p-2 hover:transform hover:translate-x-2.5 mr-5 max-[400px]:hidden`}
                    style={{ fontFamily: "ubuntu" }}
                  >
                    <FontAwesomeIcon icon={faHeart} id="heart" width={25} />
                    Sponsor
                  </button>
                </a>
              ))}
              <div className="block max-xl:hidden">
                <AuthButton />
              </div>

              <div className="relative flex justify-center items-center flex-row w-[70px] h-[35px] m-0 max-[400px]:fixed max-[400px]:top-12 max-[400px]:left-5">
                <ToggleSwitch />
              </div>
            </div>
          </div>
          {/* Hamburger menu icon for mobile */}
          <div
            className={`hamburger ${isActive ? "open" : ""} ${isPremium?"hidden":""}`}
            id="hamburger"
            onClick={toggleMenu}
          >
            <div
              className={`${
                theme ? "bg-[#333]" : "bg-white"
              } w-[25px] h-[3px] my-[4px] transition duration-400`}
            ></div>
            <div
              className={`${
                theme ? "bg-[#333]" : "bg-white"
              } w-[25px] h-[3px] my-[4px] transition duration-400`}
            ></div>
            <div
              className={`${
                theme ? "bg-[#333]" : "bg-white"
              } w-[25px] h-[3px] my-[4px] transition duration-400`}
            ></div>
          </div>
        </nav>
        {/* Mobile menu links */}
        <ul
          className={`${
            isActive
              ? `nav_links_mobile list-none flex p-10 flex-col items-center gap-5 navAnimate ease-in-out duration-200 justify-center overflow-hidden ${
                  theme ? "bg-gray-200" : "bg-[#2b2b2b]"
                }`
              : "hidden"
          }`}
          id="nav-links1"
        >
          <li
            className={`${
              theme
                ? "text-black after:bg-[#6eb6b95f]"
                : "text-white after:bg-[#ffffff5f]"
            } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left`}
          >
            <Link href="/" onClick={() => setIsActive(false)}>
              Home
            </Link>
          </li>
          <li
            className={`${
              theme
                ? "text-black after:bg-[#6eb6b95f]"
                : "text-white after:bg-[#ffffff5f]"
            } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left`}
          >
            <Link href="/about" onClick={() => setIsActive(false)}>
              About
            </Link>
          </li>
          <li
            className={`${
              theme
                ? "text-black after:bg-[#6eb6b95f]"
                : "text-white after:bg-[#ffffff5f]"
            } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left`}
          >
            <Link href="/team" onClick={() => setIsActive(false)}>
              Team
            </Link>
          </li>
          <li
            className={`${
              theme
                ? "text-black after:bg-[#6eb6b95f]"
                : "text-white after:bg-[#ffffff5f]"
            } text-xl font-normal px-4 py-2 relative after:content-[''] after:absolute after:w-full after:transform after:scale-x-0 after:h-[3px] after:bottom-1 after:left-0 after:bg-[#63b5c3] after:origin-bottom-right after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-bottom-left`}
          >
            <Link href="/contact" onClick={() => setIsActive(false)}>
              Contact
            </Link>
          </li>
          <li>
            <div className="auth-mobile flex gap-1">
              <a href="https://github.com/sponsors/mdazfar2" target="_blank">
                <button
                  className={`${
                    theme
                      ? "bg-gray-100/80 text-black hover:border-[1px] hover:border-whitesmoke"
                      : "bg-[#000] text-white hover:bg-transparent hover:border-[1px] hover:border-white"
                  } rounded-2xl shadow-md shadow-black/20  text-xl cursor-pointer text-center transition-transform duration-500 ease-in-out w-30 p-2 hover:transform hover:translate-x-2.5 mr-5 min-[400px]:hidden`}
                  style={{ fontFamily: "ubuntu" }}
                >
                  <FontAwesomeIcon icon={faHeart} id="heart" width={25} />
                  Sponsor
                </button>
              </a>
              <AuthButton />
            </div>
          </li>
        </ul>
      </header>

      <header
        className={`w-screen ${
          theme
            ? "bg-gray-100 text-black"
            : "transition-all text-white bg-[#1e1d1d]"
        } z-50 fixed top-0 transition-all overflow-hidden ${
          show ? "top-0" : "top-[-550px]"
        } ${isAdmin ? "hidden" : "block"} ${
          isBlogs || isCreateBlog || isProfile || isDevopsForum || isCreateForum
            ? "block"
            : "hidden"
        }`}
      >
        <nav className="flex justify-between items-center w-[95%] my-5 mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <div data-tilt data-tilt-scale="1.1">
              <Image
        src="/HelpOps-H Fevicon.webp" // Use the correct path to the image
        alt="Logo"
        width={48}   // Equivalent to `w-12` in Tailwind (12 * 4px = 48px)
        height={48}  // Equivalent to `h-12` in Tailwind (12 * 4px = 48px)
        className="relative max-w-full max-h-full" // Apply custom styles and responsiveness
        draggable="false" // To prevent dragging
      />
              </div>
              <div className="text-2xl max-md:text-xl max-sm:text-lg max-[475px]:text-base max-[445px]:text-[14px]">
                elpOps Hub
              </div>
            </Link>
          </div>

          {!isCreateBlog && !isProfile && !isDevopsForum && !isCreateForum && (
            <div
              className={`flex-grow lg:max-w-[300px] max-lg:max-w-[230px] max-sm:max-w-[220px] max-[445px]:max-w-[100px] max-[400px]:hidden ${
                theme ? "" : "text-black"
              }`}
            >
              <input
                type="text"
                placeholder="Search"
                onChange={handleSearchChange} // Update global searchBlog value
                className="p-2 border rounded-md w-full max-w-md"
              />
            </div>
          )}

          <div
            className={`${
              theme ? "text-gray-600" : "transition-all text-gray-300"
            } flex items-center lg:gap-10 lg:font-bold max-lg:gap-4`}
          >
            {!isCreateBlog && !isDevopsForum && !isCreateForum && (
              <div
                onClick={handleValidate}
                className="flex cursor-pointer items-center gap-2"
              >
                <div className="max-md:w-10 max-md:h-10 max-md:rounded-full max-md:bg-gray-200 max-md:flex max-md:items-center max-md:justify-center ">
                  <FontAwesomeIcon
                    icon={faPen}
                    className={`max-md:w-5 max-md:h-5 ${
                      theme ? "max-md:text-[#555]" : "max-md:text-[#333]"
                    }`}
                  />
                </div>
                <span className="max-md:hidden">Create Blog</span>
              </div>
            )}

            <div className="block max-md:hidden">
              <AuthButton />
            </div>
            <div className="relative flex justify-center items-center flex-row w-[70px] h-[35px] m-0">
              <ToggleSwitch />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
