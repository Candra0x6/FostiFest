import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

type Props = {
  onClick: () => void;
};
const dummySymptoms = [
  "Demam",
  "Batuk",
  "Sakit Kepala",
  "Pusing",
  "Mual",
  "Lemas",
  "Nyeri Sendi",
  "Pilek",
];
export const MedicalHistoryCard: React.FC<Props> = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Riwayat Penyakit
        </CardTitle>
        <p className="text-accent text-center mb-4">
          Pilih Riwayat Penyakit Anda untuk analisis AI
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        {dummySymptoms.map((symptom, index) => (
          <Label
            key={index}
            className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-primary/5 cursor-pointer"
          >
            <Input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-primary accent-primary"
            />
            <span>{symptom}</span>
          </Label>
        ))}
      </CardContent>
      <CardFooter>
        <Button onClick={() => props.onClick()} className="w-full mt-6">
          Analisis Penyakit
        </Button>
      </CardFooter>
    </Card>
  );
};
