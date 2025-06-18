import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import type { User } from '@/prisma/generated';

export const CurrentUser = createParamDecorator((data: keyof User, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest<{ user: User }>();
  const user = request.user;

  return data ? user[data] : user;
});
