import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FamilyModule } from './family/family.module';
import { MemberModule } from './member/member.module';
import { TypeModule } from './type/type.module';
import { ContributionModule } from './contribution/contribution.module';

@Module({
  imports: [
    DatabaseModule,
    FamilyModule,
    MemberModule,
    TypeModule,
    ContributionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
