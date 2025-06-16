import { BadGatewayException, Injectable } from '@nestjs/common';
import { verify } from 'argon2';

import { UserService } from '../user/user.service';

import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(dto: AuthDto) {
    const isExists = await this.userService.getByEmail(dto.email);
    if (isExists) throw new BadGatewayException('Email is busy!');

    const user = await this.userService.create(dto);

    return user;
  }

  async login(dto: AuthDto) {
    const user = await this.validateUser(dto);

    return user;
  }

  private async validateUser(dto: AuthDto) {
    const user = await this.userService.getByEmail(dto.email);
    if (!user) throw new BadGatewayException('Invalid email or password');

    const isValidPassword = await verify(user.password, dto.password);
    if (!isValidPassword) throw new BadGatewayException('Invalid email or password');

    return user;
  }

  async refresh() {}
}
