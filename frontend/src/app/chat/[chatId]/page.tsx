"use client";
import { HealthRiskResult } from "@/components/card/HealthRiskResult";
import { HealthRiskResultCard } from "@/components/card/HealthRiskResultCard";
import { ChatResponse } from "@/types/HealthPredictAI";
import { GetServerSideProps } from "next";
import { Metadata } from "next";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "zod";

const ChatDetailsPage = () => {
  const { chatId } = useParams();
  const [chatDetails, setChatDetails] = useState<ChatResponse>();
  const getChatDetails = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${chatId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const chatDetails = await response.json();
    setChatDetails(chatDetails);
  };

  useEffect(() => {
    getChatDetails();
  }, []);
  return (
    <div className="mx-auto max-w-screen-sm">
      <HealthRiskResultCard data={chatDetails as ChatResponse} />
    </div>
  );
};

export default ChatDetailsPage;
