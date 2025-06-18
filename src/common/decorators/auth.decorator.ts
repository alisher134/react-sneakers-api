import { applyDecorators, UseGuards } from '@nestjs/common';

import { Role } from '@/prisma/generated';

import { JwtGuard } from '../guards/jwt.guard';
import { RolesGuard } from '../guards/roles.guard';

import { Roles } from './roles.decorator';

export const Auth = (...roles: Role[]) => {
  if (roles.length > 0) {
    return applyDecorators(Roles(...roles), UseGuards(JwtGuard, RolesGuard));
  }

  return applyDecorators(UseGuards(JwtGuard));
};
