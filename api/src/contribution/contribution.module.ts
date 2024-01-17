import { Module } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { ContributionController } from './contribution.controller';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports:[EmailModule],
  providers: [ContributionService],
  controllers: [ContributionController],
})
export class ContributionModule {}
