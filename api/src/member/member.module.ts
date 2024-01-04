import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { FamilyModule } from 'src/family/family.module';

@Module({
  imports: [FamilyModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
