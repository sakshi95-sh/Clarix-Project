
import Header from "./components/Header";
import { Outfit } from "next/font/google";
import { test } from "./Database/test-db";
import Link from "next/link";
import Hero from "./components/Landing/Hero";
import Ticker from "./components/Landing/Ticker";
import Features from "./components/Landing/Feature";
import Cta from "./components/Landing/Cta";
import Footer from "./components/Landing/Footer";

const outfit = Outfit({ subsets: ["latin"] });


function handleFreeSignup() {
  // Handle free signup logic here
  // console.log("Free signup clicked");
}

export default function Home() {
  return (
    <div id="landing-page">
      <Header />
      <main className="min-h-screen bg-[var(--background)] pt-2 p-2  " id="main-hero">
        <Hero />
        <Ticker />
         <Features />
         <Cta />
         <Footer />
       </main>
       </div>
  );
}