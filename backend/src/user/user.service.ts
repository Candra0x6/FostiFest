import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // GET ALL USER
  async getAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: {
        history_chat: {
          include: {
            kebiasaan_hidup: true,
            detail_chat: {
              include: {
                isi_prompt: {
                  include: {
                    healthScore: true,
                    potentialConditions: true,
                    healthSummary: true,
                    lifestyleModifications: true,
                    nutritionalRecommendations: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  // GET SINGLE USER
  async getOneuser(user_id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        user_id: user_id,
      },
      include: {
        history_chat: {
          include: {
            kebiasaan_hidup: true,
            detail_chat: {
              include: {
                isi_prompt: {
                  include: {
                    healthScore: {
                      include: {
                        bmiAssessment: true,
                        interpretation: true,
                      },
                    },
                    potentialConditions: true,
                    healthSummary: true,
                    lifestyleModifications: {
                      include: {
                        implementationPlan: true,
                      },
                    },
                    nutritionalRecommendations: {
                      include: {
                        servingGuidelines: true,
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

  // POST USER
  async createUser(username: string, password: string): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 15);
    return this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
  }

  // DELETE USER
  async deleteUser(user_id: string): Promise<User> {
    return this.prisma.user.delete({
      where: { user_id },
      include: {
        history_chat: {
          include: {
            detail_chat: {
              include: {
                isi_prompt: {
                  include: {
                    healthScore: {
                      include: {
                        bmiAssessment: true,
                        interpretation: true,
                      },
                    },
                    potentialConditions: true,
                    healthSummary: true,
                    lifestyleModifications: {
                      include: {
                        implementationPlan: true,
                      },
                    },
                    nutritionalRecommendations: {
                      include: {
                        servingGuidelines: true,
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
