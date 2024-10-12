import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, FileText } from "lucide-react";
import Disases, { Disease } from "./DisasesCard";
import { FaApple } from "react-icons/fa";
import { useUserHealthStore } from "@/store/user-health-store";
import { truncateText } from "@/hooks/truncateText";
import LifestyleInfoModal from "../model/lifestyleInfoModal";
import NutritionalRecommendationsModal from "../model/nutritionalRcommendationsModal";
import { lifestylePayload } from "@/lib/validators/lifestyleSchema";
const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};
export const HealthRiskResult = (props: { onClick: () => void }) => {
  const {
    generateContentResponse,
    medicalHistory,
    userDetails,
    userLifestyle,
  } = useUserHealthStore();

  const detailUser = {
    ...userDetails,
    ...userLifestyle,
    ...medicalHistory,
    ...generateContentResponse?.analysis,
  };
  const handleApiCall = async ({ userId }: { userId: string }) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(detailUser),
        }
      );
      const data = await response.json();
    } catch (err) {
      console.error(err);
    }
  };

  console.log(generateContentResponse);
  return (
    <div className="">
      <div className="flex flex-col">
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
                {generateContentResponse?.analysis?.healthScore.score}/100
              </div>
              <Progress
                value={Number(
                  generateContentResponse?.analysis?.healthScore.score
                )}
                className="w-full"
              />
              <p className="mt-2 text-sm text-gray-600">
                {
                  generateContentResponse?.analysis?.healthScore.interpretation
                    .message
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
                generateContentResponse?.analysis
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
                {generateContentResponse?.analysis?.lifestyleModifications.map(
                  (lifestyle, index) => (
                    <LifestyleInfoModal data={lifestyle}>
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 * 0.1 }}
                        className="bg-primary/5 rounded-2xl p-4 shadow-sm cursor-pointer"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-lg font-semibold">
                            {truncateText(lifestyle.activity, 21)}
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
                            {lifestyle.implementationPlan.duration} (
                            {truncateText(
                              lifestyle.implementationPlan.frequency,
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
                  {generateContentResponse?.analysis?.nutritionalRecommendations.map(
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
              {generateContentResponse?.analysis?.healthSummary
                .followUpRecommendations +
                " " +
                generateContentResponse?.analysis?.healthSummary
                  .longTermStrategy +
                " " +
                generateContentResponse?.analysis?.healthSummary
                  .overallAssessment +
                " " +
                generateContentResponse?.analysis?.healthSummary.shortTermActions.map(
                  (Item, index) => Item + " "
                )}
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <Button
        onClick={() => handleApiCall({ userId: "cm22vx2tg0000d093gi822mak" })}
        className="w-full mt-4"
      >
        Back to Home
      </Button>
    </div>
  );
};
