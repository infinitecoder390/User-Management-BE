import { Injectable } from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}
  async login(loginDto: LoginUserDto) {
    const validateDto = await this.usersService.validateUser(loginDto);
    const payload = {
      sub: validateDto._id,
      jti: uuidv4(),
      username: validateDto.username,
    };
    const ac_jwt = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: this.configService.get('JWT_EXPIRE_IN'),
    });
    return { accessToken: ac_jwt, message: 'Access token fetched sucessfully' };
  }
}
