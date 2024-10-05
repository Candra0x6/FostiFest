import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { UserDetailForm } from "../form/MedicalInfoForm";

type Props = {
  onClick: () => void;
};
export const UserDetailCard: React.FC<Props> = (props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Informasi Kesehatan
        </CardTitle>
        <p className="text-accent text-center mb-4">
          Isi data kesehatan Anda untuk analisis AI
        </p>
      </CardHeader>
      <CardContent>
        <UserDetailForm onClick={() => props.onClick()} />
      </CardContent>
    </Card>
  );
};
