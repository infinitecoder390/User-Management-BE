import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private jwtService;
    private usersService;
    private configService;
    constructor(jwtService: JwtService, usersService: UsersService, configService: ConfigService);
    login(loginDto: LoginUserDto): Promise<{
        accessToken: string;
        message: string;
    }>;
}
