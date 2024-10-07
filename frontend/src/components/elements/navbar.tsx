import React, { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "./modal/login";
import Hamburger from "./hamburger";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const menuLinks = [
    { name: "Why", link: "/#why" },
    { name: "Benefit", link: "/#benefit" },
    { name: "Tutorial", link: "/#tutorial" },
    { name: "Check", link: "/#form" },
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
        className={`fixed top-0 z-[999] w-full flex justify-center ${
          sticky
            ? "p-2 bg-white/90 md:drop-shadow-md md:rounded-xl md:mt-6 w-full md:w-[92%] md:mx-[4%]"
            : "p-2 bg-transparent"
        }`}
      >
        <div className="w-full max-w-screen-xl flex items-center justify-between px-4">
          <div className="mx-7">
            <a
              href="/"
              className="flex items-center justify-start uppercase text-2xl md:text-3xl font-bold hover:bg-gradient-to-r hover:from-green-300 hover:via-blue-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent"
            >
              <span className="w-60">Title</span>
            </a>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex container justify-between h-16 mx-auto md:justify-end md:space-x-8">
            <ul className="items-stretch space-x-3 flex">
              {menuLinks.map((menu, index) => (
                <li className="flex text-center" key={index}>
                  <Link
                    rel="noopener noreferrer"
                    className="flex items-center px-4 mb-1 border-b-2 border-transparent hover:bg-gradient-to-r hover:from-green-300 hover:via-blue-500 hover:to-purple-600 hover:bg-clip-text hover:text-transparent uppercase"
                    href={menu.link}
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}
              <li className="flex py-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className={`ml-2 rounded-full px-8 py-2 text-sm font-medium border border-blue-600 text-blue-600 hover:border-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-500 hover:text-white`}
                >
                  Login
                </button>
              </li>
            </ul>
          </div>

          <div className={`md:hidden z-[999]`}>
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
            style={{ height: '100vh' }}
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
                    setModalOpen(true);
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
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Navbar;