// components/Stepper.js
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiChoiseCard } from "../card/AiChoiseCard";
import { Button } from "../ui/button";
import { IoIosArrowRoundBack } from "react-icons/io";
import { HiLightningBolt } from "react-icons/hi";
import { FaStethoscope, FaBowlFood } from "react-icons/fa6";
import { MedicalInfoCard } from "../card/MedicalInfoCard";
import { LoadingStethoscope } from "../skeleton/LoadingStethoscope";
import { MedicalHistoryCard } from "../card/MedicalHistoryCard";
import { HealthRiskResult } from "../card/HealthRiskResult";
import { LifestyleInfoCard } from "../card/LifestyleInfoCard";
import { useUserHealthStore } from "@/store/user-health-store";
import { useRouter } from "next/navigation";
const nutrition = [
  {
    id: 1,
    name: "Protein",
    description: "Essential for muscle growth and repair.",
    icon: "🍗",
  },
  {
    id: 2,
    name: "Carbohydrates",
    description: "Primary source of energy for the body.",
    icon: "🍞",
  },
  {
    id: 3,
    name: "Fats",
    description: "Necessary for hormone production and cell growth.",
    icon: "🥑",
  },
  {
    id: 4,
    name: "Vitamins",
    description: "Important for various biochemical processes.",
    icon: "🍊",
  },
  {
    id: 5,
    name: "Minerals",
    description: "Crucial for bone health and fluid balance.",
    icon: "🧂",
  },
  {
    id: 6,
    name: "Fiber",
    description: "Aids in digestion and prevents constipation.",
    icon: "🌾",
  },
  {
    id: 7,
    name: "Water",
    description: "Vital for all bodily functions.",
    icon: "💧",
  },
];
export default function SickPrediction() {
  const { generateContentResponse } = useUserHealthStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const router = useRouter();
  const handleStep = () => {
    nextStep();
  };
  const handlePathSelect = (path: string) => {
    setSelectedPath(path);
    nextStep();
  };

  const backToHome = () => {
    setCurrentStep(0);
  };

  // Clean up the timer on unmount
  const steps = [
    {
      title: "Step 1",
      content: () => (
        <div className="flex flex-col space-y-4 mt-10">
          <h1 className="text-5xl text-center mt-5 font-bold text-primary">
            HealthLeans-AI
          </h1>
          <span className="text-accent text-lg text-center">
            Pilih Fitur yang ingin Anda gunakan
          </span>
          <AiChoiseCard
            title="Periksa Diri"
            description="Periksa diri Anda dengan AI untuk mengetahui gejala penyakit yang diderita."
            headerIcon={FaStethoscope}
            footerIcon={HiLightningBolt}
            onClick={() => {
              handlePathSelect("selfCheck");
            }}
          />
          <AiChoiseCard
            title="Saran Nutrisi"
            description="Saran nutrisi untuk Anda dengan AI"
            headerIcon={FaBowlFood}
            footerIcon={HiLightningBolt}
            onClick={() => handlePathSelect("doctorConsult")}
          />
        </div>
      ),
    },
    {
      title: "Step 2",
      content: () => {
        if (selectedPath === "selfCheck") {
          return <MedicalInfoCard onClick={() => handleStep()} />;
        } else if (selectedPath === "doctorConsult") {
          return (
            <div className="space-y-6">
              <h2 className="text-center text-2xl font-bold">
                Pili Rasa Makanan Kesukaan Anda
              </h2>
              <p className="text-accent text-center mb-4">
                Pilih dokter yang sesuai dengan kebutuhan Anda
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nutrition.map((item, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      // Handle doctor selection
                      nextStep();
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden"></div>
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.description}
                        </p>
                        <p className="text-sm text-blue-600 mt-1">
                          {item.icon}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
      },
    },
    {
      title: "Step 3",
      content: () => {
        if (selectedPath === "selfCheck") {
          return <LifestyleInfoCard onClick={() => nextStep()} />;
        } else if (selectedPath === "doctorConsult") {
          return (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-sm text-primary mt-2">SOON</p>
              <Button onClick={() => router.push("/chat")} className="w-full">
                Kembali ke Beranda
              </Button>
            </div>
          );
        }
      },
    },
    {
      title: "Step 4",
      content: () => {
        if (selectedPath === "selfCheck") {
          return <MedicalHistoryCard onClick={() => handleStep()} />;
        }
      },
    },

    {
      title: "Step 5",
      content: () => {
        if (selectedPath === "selfCheck") {
          return (
            <div className="mt-20">
              {!generateContentResponse ? (
                <LoadingStethoscope />
              ) : (
                <div>
                  <HealthRiskResult onClick={() => backToHome()} />
                </div>
              )}
            </div>
          );
        }
      },
    },
  ];

  // Sample symptoms

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className=" mx-auto container">
      {/* Navigation */}

      <Button
        onClick={prevStep}
        variant="default"
        size="icon"
        className={` transition-all duration-700 ease-in-out ${
          currentStep !== 0 && currentStep !== 4
            ? "visible translate-x-0 opacity-100 mb-4"
            : "invisible translate-x-11 opacity-0 mb-0 absolute"
        }`}
      >
        <IoIosArrowRoundBack className="text-3xl" />
      </Button>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3, bounce: 0.1 }}
        >
          {steps[currentStep].content()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
