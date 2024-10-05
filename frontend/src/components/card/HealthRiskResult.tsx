import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, Calendar, FileText } from "lucide-react";
import Disases from "./DisasesCard";
import { FaApple, FaStethoscope } from "react-icons/fa";
const nutritionRecommendations = [
  { food: "Leafy greens", benefit: "Rich in vitamins and antioxidants" },
  { food: "Fatty fish", benefit: "High in omega-3 fatty acids" },
  { food: "Whole grains", benefit: "Good source of fiber and B vitamins" },
  { food: "Berries", benefit: "Packed with antioxidants and vitamin C" },
  { food: "Nuts", benefit: "Contain healthy fats and protein" },
  { food: "Pear", benefit: "Rich in fiber and antioxidants" },
];

const diseaseSpecificAdvice = [
  {
    disease: "Cardiovascular Disease",
    advice: [
      "Monitor your blood pressure regularly and keep it under control",
      "Quit smoking and avoid secondhand smoke",
      "Manage stress through relaxation techniques or mindfulness practices",
      "Limit alcohol consumption to moderate levels",
      "Consider discussing aspirin therapy with your doctor",
    ],
  },
  {
    disease: "Type 2 Diabetes",
    advice: [
      "Monitor your blood glucose levels as recommended by your healthcare provider",
      "Follow a consistent meal schedule to help regulate blood sugar",
      "Stay hydrated by drinking plenty of water throughout the day",
      "Care for your feet daily, checking for any cuts or sores",
      "Learn to recognize and manage the symptoms of hypoglycemia",
    ],
  },
  {
    disease: "Osteoporosis",
    advice: [
      "Avoid smoking and excessive alcohol consumption",
      "Perform balance exercises to reduce the risk of falls",
      "Ensure your home is free of trip hazards",
      "Discuss medication options with your doctor if recommended",
      "Get regular bone density scans as advised by your healthcare provider",
    ],
  },
];

export const HealthRiskResult = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="">
      <motion.h1
        className="text-3xl font-bold mb-6 text-foreground text-center"
        {...fadeIn}
      >
        HealthLens Risk Detection Results
      </motion.h1>

      <div className="flex flex-col">
        <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="my-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2" />
                Overall Health Score
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-500 mb-2">
                78/100
              </div>
              <Progress value={78} className="w-full" />
              <p className="mt-2 text-sm text-gray-600">
                Your health score is above average. Keep up the good work!
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
            <Disases />
          </motion.div>

          <motion.div {...fadeIn} transition={{ delay: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2" />
                  Recommended Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 * 0.1 }}
                  className="bg-primary/5 rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Mild Chest Pain</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={89} className="flex-grow" />
                    <span className="text-sm font-medium">89%</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <span className="ml-2">Hight Impect for Diabet</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 * 0.1 }}
                  className="bg-primary/5 rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Mild Chest Pain</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={89} className="flex-grow" />
                    <span className="text-sm font-medium">89%</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <span className="ml-2">Hight Impect for Diabet</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 * 0.1 }}
                  className="bg-primary/5 rounded-2xl p-4 shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold">Mild Chest Pain</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Progress value={89} className="flex-grow" />
                    <span className="text-sm font-medium">89%</span>
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <span className="ml-2">Hight Impect for Diabet</span>
                  </div>
                </motion.div>
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
                  Recommended Nutrition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-gray-600">
                  Based on your health profile, we recommend incorporating the
                  following foods into your diet:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nutritionRecommendations.map((item, index) => (
                    <div
                      key={index}
                      className="bg-primary/5 rounded-2xl p-4 shadow-sm"
                    >
                      <div>
                        <h3 className="font-semibold">{item.food}</h3>
                        <p className="text-sm text-gray-600">{item.benefit}</p>
                      </div>
                    </div>
                  ))}
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
              Health Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">
              Based on your profile and recent health data, we've identified
              several areas for improvement. Your cardiovascular health is the
              primary concern, followed by an increased risk for type 2
              diabetes. However, your overall health score is still above
              average. We recommend focusing on heart-healthy habits and
              scheduling a follow-up with your doctor to discuss these findings
              in detail.
            </p>
          </CardContent>
        </Card>
      </motion.div>
      <Button className="w-full mt-4">Back to Home</Button>
    </div>
  );
};
