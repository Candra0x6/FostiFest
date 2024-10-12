import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:user_id')
  @HttpCode(HttpStatus.OK)
  async getOneUser(@Param('user_id') user_id: string): Promise<User | null> {
    return this.userService.getOneuser(user_id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() data: User): Promise<User> {
    return this.userService.createUser(data.username, data.password);
  }

  @Delete('/:user_id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Param('user_id') user_id: string) {
    return this.deleteUser(user_id);
  }
}
