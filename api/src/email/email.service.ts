// email.service.ts

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Member, Prisma } from '@prisma/client';
import { NewContributionDto } from 'src/contribution/dto/new-contribution.dto';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendMemberWelcome(member: Prisma.MemberCreateInput) {
    const url = `http://localhost:3000`;

    await this.mailerService.sendMail({
      to: member.email,
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to AHEZA SF App! join us',
      template: './welcome', // `.ejs` extension is appended automatically
      context: {
        // filling <%= %> brackets with content
        name: member.names,
        url,
      },
    });
  }

  async sendContributionReciept(
    contribution: NewContributionDto,
    member: Member,
  ) {
    const url = `http://localhost:3000`;

    await this.mailerService.sendMail({
      to: member.email,
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Contribution receipt',
      template: './receipt', // `.ejs` extension is appended automatically
      context: {
        // filling <%= %> brackets with content
        name: member.names,
        year: contribution.year,
        amount: contribution.amount,
        url,
      },
    });
  }

  async sendReset(email: string, token: string) {
    const url = `http://localhost:3000`;

    const resetLink = `${url}/auth/new-password?token=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: '"Support Team" <support@example.com>', // override default from
      subject: 'Welcome to AHEZA SF App! join us',
      template: './reset', // `.ejs` extension is appended automatically
      context: {
        // filling <%= %> brackets with content
        resetLink,
      },
    });
  }
}
