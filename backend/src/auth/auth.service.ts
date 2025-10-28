import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async login(loginData: any) {
    // Mock - em produção usar JWT
    return {
      access_token: 'mock_token_' + Date.now(),
      expires_in: 3600,
      user: {
        address: loginData.address,
      },
    };
  }

  async register(registerData: any) {
    return {
      success: true,
      message: 'Usuário cadastrado com sucesso',
      user: {
        address: registerData.address,
      },
    };
  }

  async refreshToken(refreshData: any) {
    return {
      access_token: 'new_token_' + Date.now(),
      expires_in: 3600,
    };
  }
}
