"use client";
import SickPredection from "@/components/feature/SickPredection";
import { generateContentFromServer } from "@/hooks/generateContent";

export default function ChatPage() {
  const handleAnlyzRecy = async () => {
    try {
      const response = await generateContentFromServer();
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="mx-auto max-w-screen-sm ">
      <div className="flex flex-col items-center">
        <h1
          onClick={handleAnlyzRecy}
          className="text-5xl text-center mt-5 font-bold text-primary"
        >
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
