'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AIPrediction from "@/components/AIPrediction";
import HowItWorks from "@/components/HowItWorks";
import Testimonals from "@/components/Testimonals";
import Pricing from "@/components/Pricing";
import CTASection from "@/components/CTASection"; // example

import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Navbar />
      <AIPrediction />
      <HowItWorks />
      <Testimonals />
      <Pricing />
      console.log("CTASection =", CTASection);

      <CTASection />


      <Footer />
    </>
  );
}
