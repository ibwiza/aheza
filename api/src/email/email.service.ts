// email.service.ts

import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Member, Prisma } from '@prisma/client';

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
    contribution: Prisma.ContributionCreateInput,
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
        month: contribution.month,
        amount: contribution.amount,
        url,
      },
    });
  }
}
