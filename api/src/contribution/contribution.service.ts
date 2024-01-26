import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { EmailService } from 'src/email/email.service';
import { NewContributionDto } from './dto/new-contribution.dto';
import { YearContributionDto } from './dto/year-contribution.dto';

@Injectable()
export class ContributionService {
  constructor(
    private readonly databaseService: DatabaseService,
    private emailService: EmailService,
  ) {}

  async createContribution(data: NewContributionDto) {
    const member = await this.databaseService.member.findUnique({
      where: {
        id: data.memberId,
      },
    });
    // const activeTypes = await this.databaseService.type.findMany({
    //   where: {
    //     active: true,
    //   },
    // });

    // const sum = this.sumPercentage(activeTypes);
    // if (sum === 100) {
    //   const contributionData: any[] = [];
    //   (await activeTypes).map((type) => {
    //     contributionData.push({
    //       typeId: type.id,
    //       memberId: member.id,
    //       year: data.year,
    //       amount: (data.amount * type.percentage) / 100,
    //     });
    //   });

    const contribution = this.databaseService.contribution.create({
      data: data,
    });
    if (contribution) {
      await this.emailService.sendContributionReciept(data, member);
      return contribution;
    }
    // } else {
    //   throw new HttpException(
    //     `${sum} percentage sum is not equal to 100`,
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
  }

  async findContributions() {
    return this.databaseService.contribution.findMany({});
  }

  async findContributionsByMember(email: string) {
    const member = await this.databaseService.member.findUnique({
      where: { email: email },
    });
    const memberId = member.id;
    const data = await this.databaseService.contribution.groupBy({
      by: ['year', 'memberId'],
      where: { memberId: memberId },
      _sum: { amount: true },
    });

    return data;
  }

  async findContributionsByMemberId(memberId: string) {
    const data = await this.databaseService.contribution.groupBy({
      by: ['year', 'memberId'],
      where: { memberId: memberId },
      _sum: { amount: true },
    });

    return data;
  }

  async findContributionsByYear({ memberId, year }: YearContributionDto) {
    return this.databaseService.contribution.findMany({
      where: {
        memberId: memberId,
        year: year,
      },
    });
  }

  // sumPercentage(activeTypes): number {
  //   let total = 0;
  //   for (const num of activeTypes) {
  //     total += num.percentage;
  //   }
  //   return total;
  // }
}
