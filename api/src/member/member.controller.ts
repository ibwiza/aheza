import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Member, Prisma } from '@prisma/client';
import { MemberService } from './member.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findMembers() {
    return this.memberService.findMember();
  }

  @Post()
  async createMember(@Body() data: Prisma.MemberCreateInput) {
    return this.memberService.createMember(data);
  }
  @UseGuards(AuthGuard)
  @Get(':cid')
  async findMemberByCid(@Param() cid: string) {
    return this.memberService.findMemberByCid(cid);
  }
}
