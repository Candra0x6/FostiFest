import { Body, Controller, Param, Post } from '@nestjs/common';
import { ChatService, ChatWithDetail, UserWithChats } from './chat.service';

@Controller('/api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/:user_id')
  async createUserChat(
    @Body() data: ChatWithDetail,
    @Param('user_id') user_id: string,
  ): Promise<UserWithChats> {
    return this.chatService.createChat(user_id, data);
  }
}
