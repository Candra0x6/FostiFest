import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get('/:user_id')
  async getOneUser(@Param('user_id') user_id: string): Promise<User | null> {
    return this.userService.getOneuser(user_id);
  }

  @Post()
  async createUser(@Body() data: User): Promise<User> {
    return this.userService.createUser(data.username, data.password);
  }

  @Delete('/:user_id')
  async deleteUser(@Param('user_id') user_id: string): Promise<User> {
    return this.deleteUser(user_id);
  }
}
