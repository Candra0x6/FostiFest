import { demographicsPayload } from "@/lib/validators/demographicsSchema";
import { lifestylePayload } from "@/lib/validators/lifestyleSchema";

export interface HealthAnalysis {
    healthScore: {
      score: number;
      interpretation: {
        rating: number;
        message: string;
      };
      bmiAssessment: {
        bmiValue: number;
        category: string;
        healthImplications: string;
      };
    };
    potentialConditions: Array<{
      name: string;
      probability: number;
      severity: 'low' | 'medium' | 'high';
      medicalAttention: 'monitoring' | 'consult' | 'immediate';
      detailedAnalysis: string;
      recommendedTests: string[];
    }>;
    lifestyleModifications: Array<{
      activity: string;
      impactFactor: number;
      targetConditions: string[];
      implementationPlan: {
        frequency: string;
        duration: string;
        intensity: string;
        precautions: string[];
      };
    }>;
    nutritionalRecommendations: Array<{
      food: string;
      benefits: string;
      targetSymptoms: string[];
      servingGuidelines: {
        amount: string;
        frequency: string;
        bestTimeToConsume: string;
        preparations: string[];
      };
    }>;
    healthSummary: {
      overallAssessment: string;
      urgentConcerns: string[];
      shortTermActions: string[];
      longTermStrategy: string;
      followUpRecommendations: string;
    };
  }

  export interface DemographicsDetails extends demographicsPayload {
    chat_id : string,
  }
  export interface UserDetails extends DemographicsDetails {
    kebiasaan_hidup: lifestylePayload
    riwayat_penyakit: string[]
  }
export interface ChatResponse extends UserDetails {
  detail_chat :{
    isi_prompt : HealthAnalysis
  }   
}