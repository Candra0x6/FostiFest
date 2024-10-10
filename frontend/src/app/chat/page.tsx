"use client";
import SickPredection from "@/components/feature/SickPredection";

export default function ChatPage() {
  return (
    <div className="mx-auto max-w-screen-sm ">
      <div className="flex flex-col items-center">
        <h1 className="text-5xl text-center mt-5 font-bold text-primary">
          Doc-eAI
        </h1>
        <span className="text-accent text-lg">
          Pilih Fitur yang ingin Anda gunakan
        </span>
      </div>
      <div className="">
        <SickPredection />
      </div>
    </div>
  );
}
