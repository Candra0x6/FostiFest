import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
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
          include: { detail_chat: true },
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
            detail_chat: true,
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
}
