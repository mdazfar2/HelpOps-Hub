import { Inter } from "next/font/google";
import "./globals.css";
import Loader from "@components/Loader";
import Header from "@components/Header";
import Footer from "@components/Footer";
import Authprovider from "@components/auth/Authprovider";
import { NextAuthProvider } from "./provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Helpops-Hub",
  description: "Ensuring You Never Get Stuck In DevOps Again!",
  icons: {
    icon: "/HelpOps-H Fevicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div id="Background1"></div>
      <div id="Background2"></div>
        <NextAuthProvider>
          <Loader />
          <Header />
          {children}
          <Footer />
        </NextAuthProvider>
      </body>
    </html>
  );
}
