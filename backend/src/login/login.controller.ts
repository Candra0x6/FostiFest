import { Body, Controller, Post, HttpStatus, HttpCode } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('/api/login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() { username, password }: { username: string; password: string },
  ) {
    const user = await this.loginService.login(username, password);
    if (user) {
      return { message: 'Login success', user };
    }
    return {
      status: HttpStatus.UNAUTHORIZED,
      message: 'Invalid username or password',
    };
  }
}
