"use client";

import { AiChoiseCard } from "@/components/card/AiChoiseCard";
import { UserDetailForm } from "@/components/form/MedicalInfoForm";
import SickPredection from "@/components/feature/SickPredection";

function ChatPage() {
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

export default ChatPage;
//  TB, BB, Kelamin, Umur, Riwayat Penyakit
