import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { LifestyleForm } from "../form/LifestyleForm";

type Props = {
  onClick: () => void;
};
export const LifestyleInfoCard: React.FC<Props> = (props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Informasi Kebiasaan Anda
        </CardTitle>
        <p className="text-accent text-center mb-4">
          Isi data kebiasaan hidup Anda untuk analisis AI
        </p>
      </CardHeader>
      <CardContent>
        <LifestyleForm onClick={() => props.onClick()} />
      </CardContent>
    </Card>
  );
};
