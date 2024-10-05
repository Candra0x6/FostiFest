import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { User, Chat, PromptHistory } from '@prisma/client';

export type UserWithChats = User & {
  history_chat: ChatWithDetail[];
};

export type ChatWithDetail = Chat & {
  detail_chat: PromptHistory;
};

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  // POST USER WITH CHAT
  async createChat(
    user_id: string,
    data: ChatWithDetail,
  ): Promise<UserWithChats> {
    return this.prisma.user.update({
      where: { user_id },
      include: {
        history_chat: {
          include: { detail_chat: true },
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
                isi_prompt: data.detail_chat.isi_prompt,
              },
            },
          },
        },
      },
    });
  }
}
