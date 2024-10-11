"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";
import { Disease } from "../card/DisasesCard";
import { motion } from "framer-motion";
import { IoMdInformationCircle } from "react-icons/io";
import { ChevronDown, PercentCircle } from "lucide-react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { FaNotesMedical } from "react-icons/fa";
import { truncateText } from "@/hooks/truncateText";
export function PotentialConditionsModel({
  children,
  data,
}: {
  children: ReactNode;
  data: Disease;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data.name}</DialogTitle>
          <DialogDescription>{data.detailedAnalysis}</DialogDescription>
        </DialogHeader>
        <DialogContent>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl"
          >
            {/* Vital Signs */}
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">{data.name}</h3>

              <div className="grid grid-cols-2 gap-4">
                <VitalSign
                  icon={
                    <IoMdInformationCircle className="w-6 h-6 text-red-500" />
                  }
                  label="Perhatian Kesehatan"
                  value={
                    data.medicalAttention.charAt(0).toUpperCase() +
                    data.medicalAttention.slice(1)
                  }
                />
                <VitalSign
                  icon={<PercentCircle className="w-6 h-6 text-orange-500" />}
                  label="Presentase Penyakit"
                  value={(data.probability * 100).toFixed(2)}
                  unit="%"
                />
                <VitalSign
                  icon={<InfoCircledIcon className="w-6 h-6 text-blue-500" />}
                  label="Indikasi Penyakit"
                  value={
                    data.severity.charAt(0).toUpperCase() +
                    data.severity.slice(1)
                  }
                />
                <VitalSign
                  icon={<FaNotesMedical className="w-6 h-6 text-blue-300" />}
                  label="Saran Tindakan"
                  value={
                    data.recommendedTests[0].charAt(0).toUpperCase() +
                    data.recommendedTests[0].slice(1)
                  }
                />
              </div>
            </div>

            {/* Expandable Section */}
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="p-4 bg-primary/5 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Informasi Tambahan
                </h3>
                <p className="text-gray-600">{data.detailedAnalysis}</p>
              </div>
            </motion.div>

            {/* Expand Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full p-2 flex items-center justify-center text-primary transition-colors"
            >
              <span className="mr-2">{isExpanded ? "Less" : "More"}</span>
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>
          </motion.div>
        </DialogContent>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function VitalSign({
  icon,
  label,
  value,
  unit,
}: {
  icon: ReactNode;
  label: string | number | string[];
  value: string;
  unit?: string;
}) {
  return (
    <div className="flex items-center">
      {icon}
      <div className="ml-3">
        <div className="text-sm text-gray-500">{label}</div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg font-semibold flex items-center space-x-2"
        >
          <h3 className="text-[16px] leading-6">{truncateText(value, 40)} </h3>
          <span className="text-sm font-normal text-gray-500">{unit}</span>
        </motion.div>
      </div>
    </div>
  );
}
