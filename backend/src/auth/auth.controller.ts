import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginData: any) {
    return this.authService.login(loginData);
  }

  @Post('register')
  async register(@Body() registerData: any) {
    return this.authService.register(registerData);
  }

  @Post('refresh')
  async refresh(@Body() refreshData: any) {
    return this.authService.refreshToken(refreshData);
  }
}
