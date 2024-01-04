import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
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
        cid: true,
        names: true,
        createdAt: true,
        updatedAt: true,
        members: {
          select: {
            names: true,
          },
        },
      },
    });
  }
}
