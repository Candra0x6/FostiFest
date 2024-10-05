import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

interface Disease {
  name: string;
  probability: number;
  severity: "low" | "medium" | "high";
}

export default function Disases() {
  const [diseases] = useState<Disease[]>([
    { name: "Common Cold", probability: 0.75, severity: "low" },
    { name: "Influenza", probability: 0.45, severity: "medium" },
    { name: "COVID-19", probability: 0.15, severity: "high" },
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-green-500";
      case "medium":
        return "text-yellow-500";
      case "high":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

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
      <CardHeader>
        <CardTitle>Top Health Risks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {diseases.map((disease, index) => (
            <motion.div
              key={disease.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-primary/5 rounded-2xl p-4 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{disease.name}</h3>
                <span
                  className={`text-sm font-medium ${getSeverityColor(
                    disease.severity
                  )}`}
                >
                  {disease.severity.charAt(0).toUpperCase() +
                    disease.severity.slice(1)}{" "}
                  Risk
                </span>
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
                  {disease.severity === "low" && "Monitor symptoms"}
                  {disease.severity === "medium" && "Consult a doctor"}
                  {disease.severity === "high" && "Seek immediate medical"}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
