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
import { NewContributionDto } from './dto/new-contribution.dto';
import { YearContributionDto } from './dto/year-contribution.dto';

@Controller('contribution')
export class ContributionController {
  constructor(private readonly contributionService: ContributionService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findContributionsByMember(@Req() req) {
    return this.contributionService.findContributionsByMember(req.user.email);
  }

  @UseGuards(AuthGuard)
  @Get('member/:memberId')
  async findContributionsByMemberId(@Param('memberId') memberId: string) {
    return this.contributionService.findContributionsByMemberId(memberId);
  }

  @UseGuards(AuthGuard)
  @Post('member')
  async findContributionsByYear(@Body() data: YearContributionDto) {
    return this.contributionService.findContributionsByYear(data);
  }

  @Get('all')
  async findContributions() {
    return this.contributionService.findContributions();
  }
  @Post()
  async createContribution(@Body() data: NewContributionDto) {
    return this.contributionService.createContribution(data);
  }
}
