import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { DataFE } from '../db.type';
import { Chat, User } from '@prisma/client';

@Controller('/api/chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/:user_id')
  @HttpCode(HttpStatus.CREATED)
  async createUserChat(
    @Body() data: DataFE,
    @Param('user_id') user_id: string,
  ): Promise<User> {
    return this.chatService.createChat(user_id, data);
  }

  @Get('/:chat_id')
  @HttpCode(HttpStatus.OK)
  async getChatById(@Param('chat_id') chat_id: string): Promise<Chat> {
    return this.chatService.getChatById(chat_id);
  }
}
