import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
