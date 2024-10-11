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
import { motion } from "framer-motion";
import { IoMdInformationCircle } from "react-icons/io";
import { ChevronDown, PercentCircle } from "lucide-react";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { FaNotesMedical } from "react-icons/fa";
import { VitalSign } from "./potentialConditionsModal";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";

interface LifestyleData {
  activity: string;
  impactFactor: number;
  targetConditions: string[];
  implementationPlan: {
    frequency: string;
    duration: string;
    intensity: string;
    precautions: string[];
  };
}
type Props = {
  children: ReactNode;
  data: LifestyleData;
};

function LifestyleInfoModal({ children, data }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data?.activity}</DialogTitle>
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
              <h3 className="text-lg font-semibold mb-4">{data?.activity}</h3>

              <div className="grid grid-cols-2 gap-4">
                <VitalSign
                  icon={
                    <IoMdInformationCircle className="w-6 h-6 text-red-500" />
                  }
                  label="Intensitas Tindakan"
                  value={
                    data?.implementationPlan?.intensity
                      .charAt(0)
                      .toUpperCase() +
                    data?.implementationPlan?.intensity.slice(1)
                  }
                />
                <VitalSign
                  icon={<PercentCircle className="w-6 h-6 text-orange-500" />}
                  label="Presentase Kemungkinan"
                  value={(data?.impactFactor * 100).toFixed(2)}
                  unit="%"
                />
                <VitalSign
                  icon={
                    <RiCalendarScheduleLine className="w-6 h-6 text-blue-500" />
                  }
                  label="Durasi Tindakan"
                  value={
                    data?.implementationPlan?.duration.charAt(0).toUpperCase() +
                    data?.implementationPlan?.duration.slice(1)
                  }
                />
                <VitalSign
                  icon={<FaRegCalendarAlt className="w-6 h-6 text-blue-300" />}
                  label="Frekuensi Tindakan"
                  value={
                    data?.implementationPlan?.frequency
                      .charAt(0)
                      .toUpperCase() +
                    data?.implementationPlan?.frequency.slice(1)
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
                  Additional Information
                </h3>
                <p className="text-gray-600">
                  {data?.implementationPlan?.precautions.map((item) => item)}
                </p>
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

export default LifestyleInfoModal;
