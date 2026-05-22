import Header from "./components/Header";
import { Outfit } from "next/font/google";
import { test } from "./Database/test-db";
import AuthRedirect from "./lib/AuthRedirect";
import Hero from "./Hero";
import Ticker from "./Ticker";
import Features from "./Feature";
import Cta from "./Cta";
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
