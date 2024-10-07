import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { MedicalHistoryFormCheckbox } from "../form/MedicalHistoryForm";

type Props = {
  onClick: () => void;
};

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
      <CardContent className="gap-4">
        <MedicalHistoryFormCheckbox onClick={props.onClick} />
      </CardContent>
    </Card>
  );
};
