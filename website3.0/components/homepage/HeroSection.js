import React from "react";
import Link from "next/link";

function HeroSection({ theme, getStartedHref = "/resources" }) {
  return (
    <div
      className={`${
        theme ? "bg-gray-100" : "bg-[#656566]"
      } relative h-screen max-sm:h-[560px] overflow-hidden transition-colors duration-500`}
    >
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

      <div className="absolute z-10 top-48 max-sm:top-16 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:ml-0 flex justify-left ml-24 max-2xl:ml-10 items-center transition-all duration-500">
        <div
          className={`${
            theme ? "bg-white" : "bg-[#292727] shadow-md"
          } p-16 max-[450px]:w-[95%] max-[450px]:py-14 max-[420px]:px-0 rounded-3xl shadow-xl max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center transition-colors duration-500`}
        >
          <h1
            className={`${
              theme ? "text-[#63B5C3]" : "text-white"
            } text-[85px] max-lg:text-7xl max-sm:text-6xl max-[420px]:text-5xl max-sm:text-center mb-5 font-bold transition-colors duration-500`}
          >
            HelpOps-Hub
          </h1>
          <p
            className={`${
              theme ? "text-black" : "text-white"
            } ubuntu max-[420px]:p-4 font-extralight max-sm:text-center text-4xl max-sm:text-3xl max-[420px]:text-2xl w-96 mb-5 transition-colors duration-500`}
          >
            Ensuring You Never Get Stuck In DevOps Again!
          </p>
          <Link
            href={getStartedHref}
            className={`${
              theme ? "bg-[#63B5C3] text-white" : "bg-gray-100 text-black"
            } rounded-full max-sm:w-32 max-sm:px-3 max-sm:py-2 px-5 py-3 transition duration-500 transform hover:scale-105`}
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
