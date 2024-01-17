import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Member, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class MemberService {
  constructor(
    private readonly databaseService: DatabaseService,
    private emailService: EmailService,
  ) {}

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


    try {
      const member = this.databaseService.member.create({
        data: data
      });
      await this.emailService.sendMemberWelcome(data);
      return member;
    } catch (error) {
    }
  }

  async findMemberByCid(cid: string) {
    return await this.databaseService.member.findUnique({
      where: {
        cid: cid,
      },
    });
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
