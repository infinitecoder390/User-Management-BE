import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private readonly authservice;
    constructor(authservice: AuthService);
    login(loginDto: LoginUserDto): Promise<{
        accessToken: string;
        message: string;
    }>;
}
