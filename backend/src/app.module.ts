import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './login/login.module';

@Module({
  imports: [UserModule, ChatModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
