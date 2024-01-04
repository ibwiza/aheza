import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class MemberService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createMember(data: Prisma.MemberCreateInput) {
    const existEmail = await this.databaseService.member.findUnique({
      where: {
        email: data.email,
      },
    });
    const existPhone = await this.databaseService.member.findUnique({
      where: {
        phone: data.phone,
      },
    });
    if (existEmail) {
      throw new HttpException(
        `${data.email} email arleady exist`,
        HttpStatus.CONFLICT,
      );
    }
    if (existPhone) {
      throw new HttpException(
        `${data.phone} Phone arleady exist`,
        HttpStatus.CONFLICT,
      );
    }
    return this.databaseService.member.create({ data: data });
  }

  async findMember() {
    return this.databaseService.member.findMany({
      include: {
        family: {
          select: {
            names: true,
          },
        },
      },
    });
  }
}
