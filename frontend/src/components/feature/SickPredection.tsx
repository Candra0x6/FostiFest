// components/Stepper.js
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
export default function SickPrediction() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleStep = () => {
    nextStep();
  };
  const handlePathSelect = (path: string) => {
    setSelectedPath(path);
    nextStep();
  };

  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  // Clean up the timer on unmount
  const steps = [
    {
      title: "Step 1",
      content: () => (
        <div className="flex flex-col space-y-4 mt-10">
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
                Pilih Dokter Spesialis
              </h2>
              <p className="text-accent text-center mb-4">
                Pilih dokter spesialis sesuai keluhan Anda
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {doctors.map((doctor, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => {
                      // Handle doctor selection
                      nextStep();
                    }}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                        <img
                          src={`/api/placeholder/64/64`}
                          alt={doctor.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{doctor.name}</h3>
                        <p className="text-sm text-gray-600">
                          {doctor.specialization}
                        </p>
                        <p className="text-sm text-blue-600 mt-1">
                          Tersedia: {doctor.availability}
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
          return <MedicalHistoryCard onClick={() => handleStep()} />;
        } else if (selectedPath === "doctorConsult") {
          return (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Jadwalkan Konsultasi</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pilih Tanggal
                  </label>
                  <input
                    type="date"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pilih Waktu
                  </label>
                  <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                    <option>09:00 - 10:00</option>
                    <option>10:00 - 11:00</option>
                    <option>11:00 - 12:00</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Keluhan Utama
                  </label>
                  <textarea className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                </div>
                <Button onClick={nextStep} className="w-full">
                  Konfirmasi Jadwal
                </Button>
              </div>
            </div>
          );
        }
      },
    },
    {
      title: "Step 4",
      content: () => {
        if (selectedPath === "selfCheck") {
          return (
            <div className="">
              {isLoading ? (
                <LoadingStethoscope />
              ) : (
                <div>
                  <HealthRiskResult />
                </div>
              )}
            </div>
          );
        } else if (selectedPath === "doctorConsult") {
          return (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold mb-4">Konfirmasi Jadwal</h2>
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-700">
                    Jadwal konsultasi Anda telah dikonfirmasi!
                  </p>
                  <p className="text-sm text-green-600 mt-2">
                    Anda akan menerima email konfirmasi dengan detail lengkap.
                  </p>
                </div>
                <Button onClick={() => setCurrentStep(0)} className="w-full">
                  Kembali ke Beranda
                </Button>
              </div>
            </div>
          );
        }
      },
    },
  ];

  const doctors = [
    {
      name: "Dr. Andi Wijaya",
      specialization: "Dokter Umum",
      availability: "Hari ini, 09:00 - 17:00",
    },
    {
      name: "Dr. Sarah Johnson",
      specialization: "Spesialis Penyakit Dalam",
      availability: "Hari ini, 13:00 - 20:00",
    },
    {
      name: "Dr. Michael Chang",
      specialization: "Spesialis Anak",
      availability: "Besok, 08:00 - 16:00",
    },
    {
      name: "Dr. Lisa Anderson",
      specialization: "Spesialis Jantung",
      availability: "Hari ini, 10:00 - 18:00",
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
        className={`mb-5 transition-all duration-700 ease-in-out ${
          currentStep !== 0 && currentStep !== 3
            ? "visible translate-x-0 opacity-100"
            : "invisible translate-x-11 opacity-0"
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
