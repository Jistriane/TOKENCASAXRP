export declare class AuthService {
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
    refreshToken(refreshData: any): Promise<{
        access_token: string;
        expires_in: number;
    }>;
}
