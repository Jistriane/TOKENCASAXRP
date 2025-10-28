import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginData: any): Promise<{
        access_token: string;
        expires_in: number;
        user: {
            address: any;
        };
    }>;
    register(registerData: any): Promise<{
        success: boolean;
        message: string;
        user: {
            address: any;
        };
    }>;
    refresh(refreshData: any): Promise<{
        access_token: string;
        expires_in: number;
    }>;
}
