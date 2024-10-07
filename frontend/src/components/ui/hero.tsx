"use client";

import React, { useCallback } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Hero = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}px ${y}px, rgba(50, 95, 50, 0.2), rgba(65, 105, 225, 0.2), rgba(138, 43, 226, 0) 2%)`
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    },
    [mouseX, mouseY]
  );

  return (
    <motion.section
      className="relative text-gray-900 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background }}
      />

      {/* <div className="absolute top-3/4 left-3/4 w-[300px] h-[300px] bg-blue-500 rounded-full opacity-20 filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" /> */}

      <div className="relative z-10 mx-auto max-w-screen-xl px-16 py-32 lg:flex sm:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Deteksi Dini untuk
            <span className="sm:block mt-4"> Masa Depan Lebih Sehat. </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl font-light text-gray-700 sm:text-xl">
            Cegah penyakit berkembang lebih parah, kurangi risiko, dan nikmati hidup lebih sehat.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-gradient-to-r from-blue-500 to-purple-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:text-transparent hover:bg-clip-text hover:border hover:border-blue-500 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/#why"
            >
              Mulai Sekarang
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;