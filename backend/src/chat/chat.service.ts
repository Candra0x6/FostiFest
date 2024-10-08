import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { DataFE, UserWithChats } from 'src/db.type';
import { User } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  // POST USER WITH CHAT
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
                        score: data.detail_chat.isi_prompt.healthScore.score,
                        bmiAssessment: {
                          create: {
                            bmiValue:
                              data.detail_chat.isi_prompt.healthScore
                                .bmi_assessment.bmiValue,
                            category:
                              data.detail_chat.isi_prompt.healthScore
                                .bmi_assessment.category,
                            healthImplications:
                              data.detail_chat.isi_prompt.healthScore
                                .bmi_assessment.healthImplications,
                          },
                        },
                        interpretation: {
                          create: {
                            rating:
                              data.detail_chat.isi_prompt.healthScore
                                .interpretation.rating,
                            message:
                              data.detail_chat.isi_prompt.healthScore
                                .interpretation.message,
                          },
                        },
                      },
                    },

                    potentialConditions: {
                      create: {
                        name: data.detail_chat.isi_prompt.potentialConditions
                          .name,
                        probability:
                          data.detail_chat.isi_prompt.potentialConditions
                            .probability,
                        severity:
                          data.detail_chat.isi_prompt.potentialConditions
                            .severity,
                        medicalAttention:
                          data.detail_chat.isi_prompt.potentialConditions
                            .medicalAttention,
                        detailedAnalysis:
                          data.detail_chat.isi_prompt.potentialConditions
                            .detailedAnalysis,
                        recommendedTests:
                          data.detail_chat.isi_prompt.potentialConditions
                            .recommendedTests,
                      },
                    },

                    lifestyleModifications: {
                      create: {
                        activity:
                          data.detail_chat.isi_prompt.lifestyleModifications
                            .activity,
                        impactFactor:
                          data.detail_chat.isi_prompt.lifestyleModifications
                            .impactFactor,
                        targetConditions:
                          data.detail_chat.isi_prompt.lifestyleModifications
                            .targetConditions,
                        implementationPlan: {
                          create: {
                            frequency:
                              data.detail_chat.isi_prompt.lifestyleModifications
                                .implementationPlan.frequency,
                            duration:
                              data.detail_chat.isi_prompt.lifestyleModifications
                                .implementationPlan.duration,
                            intensity:
                              data.detail_chat.isi_prompt.lifestyleModifications
                                .implementationPlan.intensity,
                            precautions:
                              data.detail_chat.isi_prompt.lifestyleModifications
                                .implementationPlan.precautions,
                          },
                        },
                      },
                    },

                    nutritionalRecommendations: {
                      create: {
                        food: data.detail_chat.isi_prompt
                          .nutritionalRecommendation.food,
                        benefits:
                          data.detail_chat.isi_prompt.nutritionalRecommendation
                            .benefits,
                        targetSymptoms:
                          data.detail_chat.isi_prompt.nutritionalRecommendation
                            .targetSymptoms,
                        servingGuidelines: {
                          create: {
                            amount:
                              data.detail_chat.isi_prompt
                                .nutritionalRecommendation.servingGuidelines
                                .amount,
                            frequency:
                              data.detail_chat.isi_prompt
                                .nutritionalRecommendation.servingGuidelines
                                .frequency,
                            bestTimeToConsume:
                              data.detail_chat.isi_prompt
                                .nutritionalRecommendation.servingGuidelines
                                .bestTimeToConsume,
                            preparations:
                              data.detail_chat.isi_prompt
                                .nutritionalRecommendation.servingGuidelines
                                .preparations,
                          },
                        },
                      },
                    },

                    healthSummary: {
                      create: {
                        overallAssessment:
                          data.detail_chat.isi_prompt.healthSummary
                            .overallAssessment,
                        urgentConcerns:
                          data.detail_chat.isi_prompt.healthSummary
                            .urgentConcerns,
                        shortTermActions:
                          data.detail_chat.isi_prompt.healthSummary
                            .shortTermActions,
                        longTermStrategy:
                          data.detail_chat.isi_prompt.healthSummary
                            .longTermStrategy,
                        followUpRecommendations:
                          data.detail_chat.isi_prompt.healthSummary
                            .followUpRecommendations,
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
