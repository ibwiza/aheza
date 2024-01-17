import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class ContributionService {
  constructor(private readonly databaseService: DatabaseService,private emailService:EmailService) {}

  async createContribution(data: Prisma.ContributionCreateInput,cid:string) {
    const member = await this.databaseService.member.findUnique({
      where: {
        cid: cid,
      },
    });
    const activeTypes = await this.databaseService.type.findMany({
      where: {
        active: true,
      },
    });

    const sum = this.sumPercentage(activeTypes);
    if (sum === 100) {
      const contributionData: any[] = [];
      (await activeTypes).map((type) => {
        contributionData.push({
          typeId: type.id,
          memberId:member.id,
          year: data.year,
          month: data.month,
          amount: (data.amount * type.percentage) / 100,
        });
      });

      const contribution= this.databaseService.contribution.createMany({
        data: contributionData,
      });
      await this.emailService.sendContributionReciept(data,member)
      return contribution;
    } else {
      throw new HttpException(
        `${sum} percentage sum is not equal to 100`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async findContributions() {
    return this.databaseService.contribution.findMany({
      include: {
        type: true,
      },
    });
  }

  async findContributionsByMember(email: string) {
    const member=await this.databaseService.member.findUnique({where:{email:email}})
    return this.databaseService.contribution.findMany({
      where: {
        memberId: member.id,
      },
      include: {
        type: true,
      },
    });
  }

  sumPercentage(activeTypes): number {
    let total = 0;
    for (const num of activeTypes) {
      total += num.percentage;
    }
    return total;
  }
}
