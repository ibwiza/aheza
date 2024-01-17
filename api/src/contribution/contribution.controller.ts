import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('contribution')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findContributionsByMember(@Req() req) {
    return this.contributionService.findContributionsByMember(req.user.email);
  }

  @Get('all')
  async findContributions() {
    return this.contributionService.findContributions();
  }
  @Post(':cid')
  async createContribution(
    @Param('cid') cid: string,
    @Body() data: Prisma.ContributionCreateInput,
  ) {
    return this.contributionService.createContribution(data, cid);
  }
}
