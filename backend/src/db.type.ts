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
} from '@prisma/client';

type BMIAssessment = {
  id: number;
  bmiValue: number;
  category: string;
  healthImplication: string;
}
export type DataFE = Chat & {
  healthScore: HealthScore & {
    interpretation: Interpretation;
    bmiAssessment: BMIAssessment;
  };
  potentialConditions: PotentialCondition[];
  lifestyleModifications: (LifestyleModification & {
    implementationPlan: ImplementationPlan;
  })[];
  nutritionalRecommendation: (NutritionalRecommendation & {
    servingGuidelines: ServingGuidelines;
  })[];
  healthSummary: HealthSummary;
};

export type UserWithChats = User & {
  history_chat: DataFE;
};
