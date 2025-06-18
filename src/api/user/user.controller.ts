import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { Auth } from '@/common/decorators/auth.decorator';
import { CurrentUser } from '@/common/decorators/user.decorators';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  @Auth()
  getById(@CurrentUser('id') id: string) {
    return this.userService.getById(id);
  }
}
