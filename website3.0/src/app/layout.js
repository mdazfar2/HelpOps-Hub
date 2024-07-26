import { Inter } from "next/font/google";
import "./globals.css";
import Loader from "@components/Loader";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Authprovider from "@components/auth/Authprovider";
import { NextAuthProvider } from "./provider";
import { GlobalContext } from "@context/store";
import React from "react";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Helpops-Hub",
  description: "Ensuring You Never Get Stuck In DevOps Again!",
  icons: {
    icon: "HelpOps-H Fevicon.webp",
  },    /* Keywords and other details for SEO Optimization purpose */
  keywords: "DevOps, HelpOps, DevOps Support, DevOps Hub, Helpops Hub, DevOps Resources, DevOps Tutorials, DevOps Tools, DevOps Best Practices, Continuous Integration, Continuous Delivery, CI/CD, Infrastructure as Code, IaC, DevOps Automation, DevOps Monitoring, dev ops, dev ops what is, devops tools, dev ops pipeline, devops technologies, cloud devops, dev ops projects, learn devops, devops practices, dev ops team, devops support, devops journey, it dev ops, devops trends, devops community, devops guidelines, challenges with devops, challenges in devops, what is devops, devops meaning, devops azure, devops aws, azure devops pipeline, aws devops, devops blogs, devops benefits, devops basics, devops best practices, branching strategy in devops, build tools in devops, devops ci/cd, ci cd devops, copilot azure devops, devops definition, devops tools, devops full form, DevOps deployment, DevOps integration, DevOps security, DevOps metrics, DevOps efficiency, how to use devops, where to use devops, what is devops, what is helpopshub, about helpopshub, contact helpopshub, azfar alam, helpops team, helpopshub contact, helpops contact, helpopshub team, devops discussions, helpopshub discussions, devops arsenal, helpopshub opensource, devops issues, solve devops, trends in devops, devops trends, innovations in devops, devops technologies, technologies in devops, technologies of devops, azfar alam devops, azfar alam developer, azfar alam devops engineer, devoops engineer",
  author: "Azfar Alam",
  openGraph: {    /* Details to display when website is shared */
    type: "website",
    url: "https://helpopshub.com",
    title: "Helpops-Hub",
    description: "Ensuring You Never Get Stuck In DevOps Again!",
    site_name: "Helpops-Hub",
    locale: "en_US",
  },
  twitter: {    /* Details to display when website shared on twitter (now X) */
    card: "summary_large_image",
    url: "https://helpopshub.com",
    title: "Helpops-Hub",
    description: "Ensuring You Never Get Stuck In DevOps Again!",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div id="Background1"></div>
      <div id="Background2"></div>
      <React.StrictMode>

      <GlobalContext>
        <NextAuthProvider>
          <Loader />
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </GlobalContext>
      </React.StrictMode>
      </body>
    </html>
  );
}
