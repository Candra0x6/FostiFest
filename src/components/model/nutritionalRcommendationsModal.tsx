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
import { ChevronDown } from "lucide-react";
import { FaNotesMedical, FaRegCalendarAlt } from "react-icons/fa";
import { VitalSign } from "./potentialConditionsModal";
import { PiBowlFood } from "react-icons/pi";
import { IoTimeOutline } from "react-icons/io5";
import { MdOutlineHealthAndSafety } from "react-icons/md";

interface LifestyleData {
  food: string;
  benefits: string;
  targetSymptoms: string[];
  servingGuidelines: {
    amount: string;
    frequency: string;
    bestTimeToConsume: string;
    preparations: string[];
  };
}
type Props = {
  children: ReactNode;
  data: LifestyleData;
};

function NutritionalRecommendationsModal({ children, data }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{data.food}</DialogTitle>
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
              <h3 className="text-lg font-semibold mb-4">{data.food}</h3>

              <div className="grid grid-cols-2 gap-4">
                <VitalSign
                  icon={<PiBowlFood className="w-6 h-6 text-red-500" />}
                  label="Jumlah Konsumsi"
                  value={
                    data.servingGuidelines.amount.charAt(0).toUpperCase() +
                    data.servingGuidelines.amount.slice(1)
                  }
                />
                <VitalSign
                  icon={<IoTimeOutline className="w-6 h-6 text-orange-500" />}
                  label="Waktu Terbaik Konsumsi"
                  value={
                    data.servingGuidelines.bestTimeToConsume
                      .charAt(0)
                      .toUpperCase() +
                    data.servingGuidelines.bestTimeToConsume.slice(1)
                  }
                />
                <VitalSign
                  icon={<FaRegCalendarAlt className="w-6 h-6 text-blue-500" />}
                  label="Frekuensi Konsumsi"
                  value={
                    data.servingGuidelines.frequency.charAt(0).toUpperCase() +
                    data.servingGuidelines.frequency.slice(1)
                  }
                />
                <VitalSign
                  icon={
                    <MdOutlineHealthAndSafety className="w-6 h-6 text-blue-300" />
                  }
                  label="Mencegah Penyakit"
                  value={data.targetSymptoms.join(", ")}
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
                <p className="text-gray-600">{data.benefits}</p>
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

export default NutritionalRecommendationsModal;
