import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class TypeService {
  constructor(private readonly databaseService: DatabaseService) {}

  async createType(data: Prisma.TypeCreateInput) {
    const existType = await this.databaseService.type.findUnique({
      where: {
        names: data.names,
      },
    });
    if (existType)
      throw new HttpException(
        `${data.names} Type names arleady exist`,
        HttpStatus.CONFLICT,
      );

    return this.databaseService.type.create({
      data: data,
    });
  }

  async findTypes() {
    return this.databaseService.type.findMany({
      select: {
        cid: true,
        names: true,
        percentage: true,
        active: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async activeType(cid: string, data: Prisma.TypeUpdateInput) {
    return this.databaseService.type.update({
      where: {
        cid: cid,
      },
      data: {
        active: data.active,
      },
    });
  }
}
