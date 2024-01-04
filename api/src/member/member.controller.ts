import { Body, Controller, Get, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  
  @Get()
  async findMembers() {
    return this.memberService.findMember();
  }

  @Post()
  async createMember(@Body() data: Prisma.MemberCreateInput) {
    return this.memberService.createMember(data);
  }
}
