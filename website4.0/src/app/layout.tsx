import type { Metadata } from "next";
import "./globals.css";
import "aos/dist/aos.css";

export const metadata: Metadata = {
  title: "HelpOps-Hub • Website 4.0",
  description: "TypeScript migration workspace for the HelpOps-Hub frontend.",
  manifest: "/manifest.json",
  icons: {
    icon: "/HelpOps-H Fevicon.webp",
    apple: [
      { sizes: "180x180", url: "/HelpOps-H Fevicon-180.webp" },
      { sizes: "152x152", url: "/HelpOps-H Fevicon-152.webp" },
      { sizes: "144x144", url: "/HelpOps-H Fevicon-144.webp" },
    ],
    other: [
      {
        rel: "icon",
        sizes: "32x32",
        url: "/HelpOps-H Fevicon-32.webp",
      },
      {
        rel: "icon",
        sizes: "16x16",
        url: "/HelpOps-H Fevicon-16.webp",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-[#f4f4f4] text-[#171717] antialiased">
        {children}
      </body>
    </html>
  );
}
