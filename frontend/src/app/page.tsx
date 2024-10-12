"use client";
import Case from "@/components/ui/case";
import Hero from "@/components/ui/hero";
import Benefit from "@/components/ui/benefit";
import Why from "@/components/ui/why";
import Demo from "@/components/ui/demo-feature";
// import Footer from "@/components/elements/footer";

export default function Home() {
  return (
    <div className="font-Poppins">
      <Hero />
      <Case />
      <Why />
      <Benefit />
      <Demo />
      {/* <Footer /> */}
    </div>
  );
}
