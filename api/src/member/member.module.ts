import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { FamilyModule } from 'src/family/family.module';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [FamilyModule,EmailModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
