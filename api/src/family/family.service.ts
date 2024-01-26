import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, UserRole } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class FamilyService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createFamily(data: Prisma.FamilyCreateInput) {
    const existFamily = await this.databaseService.family.findUnique({
      where: {
        names: data.names,
      },
    });
    if (existFamily) {
      throw new HttpException(
        `${data.names} Family names  already exist`,
        HttpStatus.CONFLICT,
      );
    }
    return await this.databaseService.family.create({
      data: data,
    });
  }

  async findFamilies() {
    return this.databaseService.family.findMany({
      select: {
        id: true,
        names: true,
        createdAt: true,
        updatedAt: true,
        code: true,
        dob: true,
        father: true,
        mother: true,
        members: {
          select: {
            names: true,
          },
        },
      },
    });
  }

  async findFamily(id: string) {
    return this.databaseService.family.findUnique({
      where: {
        id: id,
      },
      include: {
        members: true,
      },
    });
  }

  async isFather(memberId: string) {
    const member = await this.databaseService.member.findUnique({
      where: { id: memberId },
    });
    const family = await this.databaseService.family.findUnique({
      where: { id: member.familyId },
    });

    if (family.father) {
      const father = await this.databaseService.member.findUnique({
        where: { id: family.father },
      });

      await this.databaseService.user.update({
        where: { email: father.email },
        data: { role: UserRole.USER },
      });
      const user = await this.databaseService.user.findUnique({
        where: { email: member.email },
      });
      if (!user)
        throw new HttpException(
          `${member.names} Doesn't have user app account`,
          HttpStatus.NOT_FOUND,
        );

      const updateUser = await this.databaseService.user.update({
        where: {
          email: member.email,
        },
        data: {
          role: UserRole.PARENT,
        },
      });

      const updateFamily = await this.databaseService.family.update({
        where: {
          id: family.id,
        },
        data: {
          father: memberId,
        },
      });

      return updateFamily;
    } else {
      const updateUser = await this.databaseService.user.update({
        where: {
          email: member.email,
        },
        data: {
          role: UserRole.PARENT,
        },
      });

      const updateFamily = await this.databaseService.family.update({
        where: {
          id: family.id,
        },
        data: {
          father: memberId,
        },
      });

      return updateFamily;
    }
  }

  async isMother(memberId: string) {
    const member = await this.databaseService.member.findUnique({
      where: { id: memberId },
    });
    const family = await this.databaseService.family.findUnique({
      where: { id: member.familyId },
    });

    if (family.mother) {
      const member = await this.databaseService.member.findUnique({
        where: { id: family.mother },
      });
      const user = await this.databaseService.user.findUnique({
        where: { email: member.email },
      });
      if (!user)
        throw new HttpException(
          `${member.names} Doesn't have app account`,
          HttpStatus.NOT_FOUND,
        );
      await this.databaseService.user.update({
        where: { email: member.email },
        data: { role: UserRole.USER },
      });
    }

    const updateUser = await this.databaseService.user.update({
      where: {
        email: member.email,
      },
      data: {
        role: UserRole.PARENT,
      },
    });

    const updateFamily = await this.databaseService.family.update({
      where: {
        id: family.id,
      },
      data: {
        mother: memberId,
      },
    });

    return updateFamily;
  }
}
