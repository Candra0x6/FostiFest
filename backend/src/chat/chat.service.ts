import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DataFE, UserWithChats } from 'src/db.type';
import { User } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  // POST USER WITH CHAT
  // ISO
  async createChat(user_id: string, data: DataFE): Promise<User> {
    return await this.prisma.user.update({
      where: { user_id },
      include: {
      history_chat: {
        include: {
        detail_chat: {
          include: {
          isi_prompt: true,
          },
        },
        },
      },
      },
      data: {
      history_chat: {
        create: {
        berat_badan: data.berat_badan,
        jenis_kelamin: data.jenis_kelamin,
        riwayat_penyakit: data.riwayat_penyakit,
        tinggi_badan: data.tinggi_badan,
        umur: data.umur,
        detail_chat: {
          create: {
          isi_prompt: {
            create: {
            healthScore: {
              create: {
              score: data.healthScore.score,
              bmiAssessment: {
                create: {
                bmiValue: data.healthScore.bmiAssessment.bmiValue,
                category: data.healthScore.bmiAssessment.category,
                healthImplications: data.healthScore.bmiAssessment.healthImplication,
                },
              },
              interpretation: {
                create: {
                rating: data.healthScore.interpretation.rating,
                message: data.healthScore.interpretation.message,
                },
              },
              },
            },
            potentialConditions: {
              create: data?.potentialConditions?.map(condition => ({
              name: condition.name,
              probability: condition.probability,
              severity: condition.severity,
              medicalAttention: condition.medicalAttention,
              detailedAnalysis: condition.detailedAnalysis,
              recommendedTests: condition.recommendedTests,
              })),
            },
            lifestyleModifications: {
              create: data?.lifestyleModifications?.map(modification => ({
              activity: modification.activity,
              impactFactor: modification.impactFactor,
              targetConditions: modification.targetConditions,
              implementationPlan: {
                create: {
                frequency: "10",
                duration: modification.implementationPlan.duration,
                intensity: modification.implementationPlan.intensity,
                precautions: modification.implementationPlan.precautions,
                },
              },
              })),
            },
            nutritionalRecommendations: {
              create: data?.nutritionalRecommendation?.map(recommendation => ({
              food: recommendation.food,
              benefits: recommendation.benefits,
              targetSymptoms: recommendation.targetSymptoms,
              servingGuidelines: {
                create: {
                amount: recommendation.servingGuidelines.amount,
                frequency: recommendation.servingGuidelines.frequency,
                bestTimeToConsume: recommendation.servingGuidelines.bestTimeToConsume,
                preparations: recommendation.servingGuidelines.preparations,
                },
              },
              })),
            },
            healthSummary: {
              create: {
              overallAssessment: data.healthSummary.overallAssessment,
              urgentConcerns: data.healthSummary.urgentConcerns,
              shortTermActions: data.healthSummary.shortTermActions,
              longTermStrategy: data.healthSummary.longTermStrategy,
              followUpRecommendations: data.healthSummary.followUpRecommendations,
              },
            },
            },
          },
          },
        },
        },
      },
      },
    });
  }
}
