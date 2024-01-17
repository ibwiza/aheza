import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { FamilyService } from './family.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('family')
export class FamilyController {
  constructor(private readonly familyService: FamilyService) {}

  @Get()
  async findFamilies() {
    return this.familyService.findFamilies();
  }
  // @UseGuards(AuthGuard)
  @Get(':cid')
  async findFamilyByCid(@Param('cid') cid: string) {
    return this.familyService.findFamily(cid);
  }

  @Post()
  async createFamily(@Body() data: Prisma.FamilyCreateInput) {
    return this.familyService.createFamily(data);
  }
}
