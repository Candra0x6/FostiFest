"use client";

import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" />

      {/* <div className="absolute top-3/4 left-3/4 w-[300px] h-[300px] bg-blue-600 rounded-full opacity-20 filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" /> */}

      <div className="relative z-10 mx-auto max-w-screen-xl px-16 py-32 lg:flex sm:h-screen lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <div className="py-[8px] px-6 rounded-xl border border-blue-600 text-blue-600 w-fit mx-auto mb-8 text-sm">
            Good Health and Well Being
          </div>
          <h1 className="text-2xl font-bold sm:text-[44px] opacity-85">
            Deteksi Dini untuk
            <span className="sm:block mt-6 leading-[1.4]">
              {" "}
              Masa Depan Lebih Sehat
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl font-[500] text-gray-500 sm:text-lg">
            Cegah penyakit berkembang lebih parah, kurangi risiko, dan nikmati
            hidup lebih sehat.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded-xl border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:text-blue-600 hover:border hover:border-blue-600 hover:bg-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/#why"
            >
              Mulai Sekarang &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
