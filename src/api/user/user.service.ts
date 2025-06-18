import { Injectable, NotFoundException } from '@nestjs/common';
import { hash } from 'argon2';

import { PrismaService } from '@/infra/prisma/prisma.service';
import type { Prisma } from '@/prisma/generated';

import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getByEmail(email: string) {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async getById(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) throw new NotFoundException('User not found!');

    return user;
  }

  async create(dto: CreateUserDto) {
    const data: Prisma.UserCreateInput = {
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
      password: await hash(dto.password),
    };

    return this.prismaService.user.create({
      data,
    });
  }
}
