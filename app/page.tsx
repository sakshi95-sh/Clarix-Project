import Header from "./components/Header";
import { Outfit } from "next/font/google";
import { test } from "./Database/test-db";
import AuthRedirect from "./components/AuthRedirect";
import Hero from "./_landing/Hero";
import Ticker from "./_landing/Ticker";
import Features from "./_landing/Feature";
import Cta from "./_landing/Cta";
import Footer from "./components/Footer";

const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
  return (
    <div id="landing-page">
      <Header />
      <main
        className="min-h-screen bg-[var(--background)] pt-2 p-2  "
        id="main-hero"
      >
        <AuthRedirect />
        <Hero />
        <Ticker />
        <Features />
        <Cta />
        <Footer />
      </main>
    </div>
  );
}
