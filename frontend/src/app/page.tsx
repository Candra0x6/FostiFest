<<<<<<< HEAD
"use server";
export default async function Home() {
  return <div className="">sigma</div>;
=======
"use client";
import Case from "@/components/ui/case";
import Hero from "@/components/ui/hero";
import Navbar from "@/components/elements/navbar";
import Benefit from "@/components/ui/benefit";
import Why from "@/components/ui/why";
import Demo from "@/components/ui/demo-feature";
import { useCookies } from "./useCookies";
// import Footer from "@/components/elements/footer";

export default function Home() {
  return (
    <div className="bg-primary font-Poppins">
      <Navbar />
      <Hero />
      <Case />
      <Why />
      <Benefit />
      <Demo />
      {/* <Footer /> */}
    </div>
  );
>>>>>>> d149588d922dea26a13b7d5f17828210c5b35b5c
}
