import { Body, Controller, Get, HttpCode, HttpStatus, Param, Put } from '@nestjs/common';

import { Auth } from '@/common/decorators/auth.decorator';
import { CurrentUser } from '@/common/decorators/user.decorators';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  @Auth()
  getProfile(@CurrentUser('id') id: string) {
    return this.userService.getById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put('profile')
  @Auth()
  updateProfile(@CurrentUser('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  @Auth('ADMIN')
  getById(@Param('id') id: string) {
    return this.userService.getById(id);
  }

  @HttpCode(HttpStatus.OK)
  @Put(':id')
  @Auth('ADMIN')
  updateById(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update(id, dto);
  }
}
