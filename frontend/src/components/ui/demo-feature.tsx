import React from "react";
import HeroVideoDialog from "./hero-video-dialog";
const Demo = () => {
  return (
    <section
      id="demo"
      className="md:px-32 px-8 md:pt-28 md:pb-20 flex flex-col items-center"
    >
      <h1 className="capitalize md:text-3xl text-2xl text-center font-[700] opacity-85">
        cek kesehatan anda
      </h1>
      <p className="mb-6 mt-3 text-gray-500 text-md md:text-[18px] text-center">
        Lihat tutorialnya dan cek kesehatanmu sekarang juga!
      </p>

      <HeroVideoDialog
        videoSrc="https://www.youtube.com/embed/2mBKGjC8nx4?si=KmAOhApSz2abdYsM"
        thumbnailSrc="https://i.ibb.co.com/pdTTqmS/demo-thumbnail.jpg"
        thumbnailAlt="Video Tutorial Penggunaan"
        className="md:w-1/2 w-full my-0 mb-24 md:my-12 z-[999]"
      />
    </section>
  );
};

export default Demo;
