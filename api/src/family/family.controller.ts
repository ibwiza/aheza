import { Body, Controller, Get, Post } from '@nestjs/common';
import { FamilyService } from './family.service';
import { Prisma } from '@prisma/client';

@Controller('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}
  @Get()
  async findFamilies() {
    return this.familyService.findFamilies();
  }
  @Post()
  async createFamily(@Body() data: Prisma.FamilyCreateInput) {
    return this.familyService.createFamily(data);
  }
}
