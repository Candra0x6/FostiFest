"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RiHealthBookLine } from "react-icons/ri";
import { ChatResponse } from "@/types/HealthPredictAI";
import { useRouter } from "next/navigation";
import useSessionStore from "@/store/session-store";

export default function Sidebar() {
  const router = useRouter();
  const [historyChat, setHistoryChat] = useState<ChatResponse[] | null>([]);
  const [isOpen, setIsOpen] = useState(true);
  const { userData } = useSessionStore();
  console.log(userData?.user_id);
  const getAllUsersChat = async ({ userId }: { userId: string }) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    setHistoryChat(data?.history_chat);
  };
  useEffect(() => {
    if (userData?.user_id) {
      getAllUsersChat({ userId: userData?.user_id as string });
    }
  }, [userData?.user_id]);
  return (
    <div className="p-4 flex justify-end z-50">
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? 0 : "-100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="w-80 h-screen bg-white z-40 rounded-3xl shadow-lg overflow-hidden fixed left-0 top-0 py-16"
      >
        <div className="px-4 pb-4">
          <h2 className="text-lg font-semibold mb-2">Recent</h2>
          <AnimatePresence>
            {historyChat &&
              historyChat.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Button
                    onClick={() => router.push(`/chat/${item.chat_id}`)}
                    variant="ghost"
                    className="w-full justify-start text-left mb-2 rounded-xl hover:bg-primary"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    {
                      item.detail_chat.isi_prompt.healthScore.bmiAssessment
                        .category
                    }
                  </Button>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </motion.div>
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 bg-primary hover:bg-primary text-white rounded-full shadow-md p-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AnimatePresence>
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90 }}
              animate={{ rotate: 0 }}
              exit={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6 text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.2 }}
            >
              <RiHealthBookLine className="h-6 w-6 text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>
    </div>
  );
}
