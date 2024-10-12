"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Hamburger from "./hamburger";
import { useRouter } from "next/navigation";
import { JwtPayload } from "jsonwebtoken";

const Navbar = ({ userData }: { userData: JwtPayload }) => {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const menuLinks = [
    { name: "Mengapa Kami", link: "/#why" },
    { name: "Manfaat", link: "/#benefit" },
    { name: "Cek Kesehatan", link: "/#demo" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-20 w-full flex justify-center ${
          sticky
            ? "p-2 md:py-4 bg-white md:drop-shadow-md md:rounded-xl md:mt-6 w-full md:w-[92%] md:mx-[4%]"
            : "p-2 md:py-6 bg-transparent"
        }`}
      >
        <div className="w-full max-w-screen-xl flex items-center justify-between px-4">
          {/* Desktop Menu */}
          <div className="hidden md:flex justify-center items-center flex-1 -mr-[8%]">
            <ul className="flex space-x-3">
              {menuLinks.map((menu, index) => (
                <li className="flex text-center mt-2" key={index}>
                  <Link
                    rel="noopener noreferrer"
                    className="flex items-center px-4 mb-1 border-b-2 border-transparent hover:text-blue-600 uppercase"
                    href={menu.link}
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right-aligned Login Button */}
          <div className="hidden md:flex">
            <button
              onClick={() =>
                userData ? router.push("/chat") : router.push("/login")
              }
              className={`ml-2 rounded-full px-8 py-2 text-sm font-medium border border-blue-600 text-blue-600 hover:border-transparent hover:bg-blue-600 hover:text-white`}
            >
              {userData ? "Dashboard" : "Login"}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className={`md:hidden z-[999] ml-auto`}>
            <div
              onClick={() => setOpen(!open)}
              className={`text-black text-3xl m-5`}
            >
              <Hamburger />
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden fixed inset-0 bg-white/90 z-[999] flex flex-col transition-transform duration-300 ${
              open ? "translate-y-0" : "-translate-y-full"
            }`}
            style={{ height: "100vh" }}
          >
            <div
              className="absolute top-4 right-4 text-black text-3xl cursor-pointer"
              onClick={() => setOpen(false)}
            >
              &times;
            </div>

            <ul className="flex flex-col justify-center text-center h-full w-full px-8 text-lg uppercase overflow-y-auto">
              {menuLinks.map((menu, i) => (
                <li
                  onClick={() => setOpen(false)}
                  key={i}
                  className="px-6 py-4 text-sm border-b-2 border-gray-300 hover:text-blue-500"
                >
                  <Link href={menu.link}>{menu.name}</Link>
                </li>
              ))}
              <li className="mt-6 hover:text-blue-500">
                <button
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="rounded-full w-full py-2 text-sm font-medium border border-blue-600 text-blue-600 hover:bg-gradient-to-l hover:from-blue-600 hover:to-purple-500 hover:text-white"
                >
                  Login
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Render modal */}
    </>
  );
};

export default Navbar;
