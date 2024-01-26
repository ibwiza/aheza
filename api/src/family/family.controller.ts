import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
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
  @Get(':id')
  async findFamilyByCid(@Param('id') id: string) {
    return this.familyService.findFamily(id);
  }

  @Post()
  async createFamily(@Body() data: Prisma.FamilyCreateInput) {
    return this.familyService.createFamily(data);
  }

  @Patch('father/:memberId')
  async isFather(@Param('memberId') memberId: string) {
    return this.familyService.isFather(memberId);
  }

  @Patch('mother/:memberId')
  async isMother(@Param('memberId') memberId: string) {
    return this.familyService.isMother(memberId);
  }
}
