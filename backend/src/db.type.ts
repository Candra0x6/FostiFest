import {
  HealthScore,
  HealthSummary,
  Chat,
  ImplementationPlan,
  Interpretation,
  LifestyleModification,
  NutritionalRecommendation,
  PotentialCondition,
  ServingGuidelines,
  User,
  KebiasaanHidup,
} from '@prisma/client';

type BMIAssessment = {
  id: number;
  bmiValue: number;
  category: string;
  healthImplications: string;
};

export type DataFE = Chat & {
  kebiasaan_hidup: KebiasaanHidup;
} & {
  healthScore: HealthScore & {
    interpretation: Interpretation;
    bmiAssessment: BMIAssessment;
  };
  potentialConditions: PotentialCondition[];
  lifestyleModifications: (LifestyleModification & {
    implementationPlan: ImplementationPlan;
  })[];
  nutritionalRecommendations: (NutritionalRecommendation & {
    servingGuidelines: ServingGuidelines;
  })[];
  healthSummary: HealthSummary;
};

export type UserWithChats = User & {
  history_chat: DataFE;
};

export type TGetChat = Chat & {
  kebiasaan_hidup: KebiasaanHidup;
};
