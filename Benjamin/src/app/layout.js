import { Inter } from "next/font/google";
import "./globals.css";
import Loader from "@components/Loader";
import Header from "@components/Header";
import Footer from "@components/Footer";
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
        <Loader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
