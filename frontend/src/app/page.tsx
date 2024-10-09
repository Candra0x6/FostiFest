"use client"
import Case from "@/components/ui/case";
import Hero from "@/components/ui/hero";
import Navbar from "@/components/elements/navbar";
import Benefit from "@/components/ui/benefit";
import Why from "@/components/ui/why";
import Demo from "@/components/ui/demo-feature";

export default function Home() {
  return (
    <div className="font-Poppins bg-primary">
      <Navbar />
      <Hero />
      <Case />
      <Why />
      <Benefit />
      <Demo />
    </div>
  );
}