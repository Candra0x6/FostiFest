import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PiFileText } from "react-icons/pi";
import { ChatResponse } from "@/types/HealthPredictAI";
import { Activity, Calendar, FileText } from "lucide-react";
import { Progress } from "../ui/progress";
import Disases, { Disease } from "./DisasesCard";
import LifestyleInfoModal from "../model/lifestyleInfoModal";
import { truncateText } from "@/hooks/truncateText";
import { FaApple } from "react-icons/fa6";
import NutritionalRecommendationsModal from "../model/nutritionalRcommendationsModal";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
type Props = {
  data: ChatResponse;
};
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const HealthRiskResultCard: React.FC<Props> = (props) => {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col mt-20">
        <motion.h1
          className="text-3xl font-bold mb-6 text-primary text-center"
          {...fadeIn}
        >
          Hasil Analisis HealthLeans
        </motion.h1>
        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="my-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2" />
                Keseluruhan Kesehatan Anda
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-500 mb-2">
                {props?.data?.detail_chat?.isi_prompt?.healthScore?.score}/100
              </div>
              <Progress
                value={Number(
                  props?.data?.detail_chat?.isi_prompt?.healthScore?.score
                )}
                className="w-full"
              />
              <p className="mt-2 text-sm text-gray-600">
                {
                  props?.data?.detail_chat?.isi_prompt?.healthScore
                    ?.interpretation?.message
                }
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            {...fadeIn}
            transition={{ delay: 0.2 }}
            className="h-full"
          >
            <Disases
              potentialConditions={
                props?.data?.detail_chat?.isi_prompt
                  ?.potentialConditions as unknown as Disease[]
              }
            />
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2" />
                  Rekomendasi Gaya Hidup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {props?.data?.detail_chat?.isi_prompt?.lifestyleModifications.map(
                  (lifestyle, index) => (
                    <LifestyleInfoModal data={lifestyle}>
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 * 0.1 }}
                        className="bg-primary/10 rounded-2xl p-4 shadow-sm cursor-pointer"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">
                            {lifestyle?.activity}
                          </h3>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={89} className="flex-grow" />
                          <span className="text-sm font-medium">
                            {lifestyle.impactFactor * 100 + "%"}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-600">
                          <span className="ml-2">
                            {lifestyle?.implementationPlan?.duration} (
                            {truncateText(
                              lifestyle?.implementationPlan?.frequency,
                              12
                            )}
                            )
                          </span>
                        </div>
                      </motion.div>
                    </LifestyleInfoModal>
                  )
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1">
          <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FaApple className="mr-2" />
                  Rekomendasi Nutrisi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">
                  Berdasarkan profil kesehatan Anda, kami merekomendasikan untuk
                  memasukkan makanan berikut:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {props?.data?.detail_chat?.isi_prompt?.nutritionalRecommendations.map(
                    (item, index) => (
                      <NutritionalRecommendationsModal data={item}>
                        <div
                          key={index}
                          className="bg-primary/5 rounded-2xl p-4 shadow-sm cursor-pointer"
                        >
                          <div>
                            <h3 className="font-semibold">{item.food}</h3>
                            <p className="text-sm text-gray-600">
                              {truncateText(item.benefits, 60)}
                            </p>
                          </div>
                        </div>
                      </NutritionalRecommendationsModal>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      <motion.div {...fadeIn} transition={{ delay: 0.4 }} className="mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2" />
              Ringkasan Kesehatan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              {props?.data?.detail_chat?.isi_prompt?.healthSummary
                ?.followUpRecommendations +
                " " +
                props?.data?.detail_chat?.isi_prompt?.healthSummary
                  ?.longTermStrategy +
                " " +
                props?.data?.detail_chat?.isi_prompt?.healthSummary
                  ?.overallAssessment +
                " " +
                props?.data?.detail_chat?.isi_prompt?.healthSummary?.shortTermActions.map(
                  (Item, index) => Item + " "
                )}
            </p>
          </CardContent>
        </Card>
        <Button
          onClick={() => router.push("/chat")}
          className="w-full mt-4 bg-primary"
        >
          Back to Home
        </Button>
      </motion.div>
    </>
  );
};
