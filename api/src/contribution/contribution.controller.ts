import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { Prisma } from '@prisma/client';

@Controller('contribution')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @Get(':memberId')
  async findContributionsByMember(
    @Param('memberId', ParseIntPipe) memberId: number,
  ) {
    return this.contributionService.findContributionsByMember(memberId);
  }

  @Post()
  async createContribution(@Body() data: Prisma.ContributionCreateInput) {
    return this.contributionService.createContribution(data);
  }
}
