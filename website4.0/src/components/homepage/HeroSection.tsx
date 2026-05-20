import Image from "next/image";
import Link from "next/link";
import type { HeroSectionProps } from "@/types/homepage";

export function HeroSection({
  theme = true,
  getStartedHref = "/resources",
}: HeroSectionProps) {
  return (
    <div
      className={`${
        theme
          ? "bg-gradient-to-br from-orange-100 via-sky-100 to-cyan-100"
          : "bg-gradient-to-br from-[#2f3c4b] via-[#304e63] to-[#375a73]"
      } relative h-screen overflow-hidden transition-colors duration-500 max-sm:h-[560px]`}
    >
      <div
        className={`${
          theme
            ? "bg-gradient-to-r from-orange-50/90 via-sky-50/90 to-cyan-50/90"
            : "bg-gradient-to-r from-[#1b222d]/85 via-[#1e2d3a]/80 to-[#213340]/85"
        } absolute bottom-0 h-[300px] w-full shadow-inner transition-colors duration-500`}
      />
      <Image
        src="/temp_bg.webp"
        alt="HelpOps-Hub"
        width={900}
        height={900}
        className="absolute top-[340px] right-0 w-[47%] translate-y-[-200px] transition-all duration-500 ease-in-out max-2xl:-right-12 max-2xl:top-[390px] max-2xl:text-black max-xl:hidden"
        draggable="false"
      />

      <div className="absolute top-48 z-10 ml-24 flex items-center justify-left transition-all duration-500 max-xl:ml-0 max-xl:flex max-xl:w-full max-xl:justify-center max-sm:top-16">
        <div
          className={`${
            theme ? "bg-white" : "bg-[#292727] shadow-md"
          } rounded-3xl p-16 shadow-xl transition-colors duration-500 max-[450px]:w-[95%] max-[450px]:py-14 max-[420px]:px-0 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center`}
        >
          <h1 className="mb-5 text-[85px] font-bold text-[#63B5C3] transition-colors duration-500 max-lg:text-7xl max-sm:text-center max-sm:text-6xl max-[420px]:text-5xl">
            HelpOps-Hub
          </h1>
          <p
            className={`${
              theme ? "text-black" : "text-white"
            } ubuntu mb-5 w-96 text-4xl font-extralight transition-colors duration-500 max-sm:text-center max-sm:text-3xl max-[420px]:p-4 max-[420px]:text-2xl`}
          >
            Ensuring You Never Get Stuck In DevOps Again!
          </p>
          <Link
            href={getStartedHref}
            className={`${
              theme ? "bg-[#63B5C3] text-white" : "bg-gray-100 text-black"
            } transform rounded-full px-5 py-3 transition duration-500 hover:scale-105 max-sm:w-32 max-sm:px-3 max-sm:py-2`}
          >
            Get started
          </Link>
        </div>
      </div>
    </div>
  );
}
