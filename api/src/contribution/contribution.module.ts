import { Module } from '@nestjs/common';
import { ContributionService } from './contribution.service';
import { ContributionController } from './contribution.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [ContributionService],
  controllers: [ContributionController],
})
export class ContributionModule {}
