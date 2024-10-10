import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { TbReportMedical } from "react-icons/tb";
import { truncateText } from "@/hooks/truncateText";
import { PotentialConditionsModel } from "../model/potentialConditionsModal";

export interface Disease {
  detailedAnalysis: string;
  medicalAttention: string;
  name: string;
  probability: number;
  recommendedTests: string[];
  severity: "low" | "medium" | "high";
}

export default function Disases(props: { potentialConditions: Disease[] }) {
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "low":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "medium":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case "high":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <HelpCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center">
        <CardTitle className="flex items-center">
          <TbReportMedical className="w-6 h-6 mr-2" />
          Tingkat Kemungkinan Penyakit
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {props?.potentialConditions?.map((disease, index) => (
            <PotentialConditionsModel data={disease && disease}>
              <motion.div
                key={disease.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-primary/5 rounded-2xl p-4 shadow-sm cursor-pointer"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold">{disease.name}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress
                    value={disease.probability * 100}
                    className="flex-grow"
                  />
                  <span className="text-sm font-medium">
                    {Math.round(disease.probability * 100)}%
                  </span>
                </div>
                <div className="mt-2 flex items-center text-sm text-gray-600">
                  {getSeverityIcon(disease.severity)}
                  <span className="ml-2">
                    {truncateText(disease?.recommendedTests[0], 25)}
                  </span>
                </div>
              </motion.div>
            </PotentialConditionsModel>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
