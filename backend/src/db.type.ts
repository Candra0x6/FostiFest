import {
  HealthScore,
  HealthSummary,
  BMIAssessment,
  Chat,
  ImplementationPlan,
  Interpretation,
  LifestyleModification,
  NutritionalRecommendation,
  PotentialCondition,
  ServingGuidelines,
  User,
} from '@prisma/client';

export type DataFE = Chat & {
  detail_chat: {
    isi_prompt: {
      healthScore: HealthScore & {
        interpretation: Interpretation;
        bmi_assessment: BMIAssessment;
      };
      potentialConditions: PotentialCondition;
      lifestyleModifications: LifestyleModification & {
        implementationPlan: ImplementationPlan;
      };
      nutritionalRecommendation: NutritionalRecommendation & {
        servingGuidelines: ServingGuidelines;
      };
      healthSummary: HealthSummary;
    };
  };
};

export type UserWithChats = User & {
  history_chat: DataFE;
};
