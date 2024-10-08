import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ChatService } from './chat.service';
import { DataFE, UserWithChats } from 'src/db.type';
import { User } from '@prisma/client';

@Controller('/api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/:user_id')
  async createUserChat(
    @Body() data: DataFE,
    @Param('user_id') user_id: string,
  ): Promise<User> {
    console.log(data);
    return this.chatService.createChat(user_id, data);
  }
}
