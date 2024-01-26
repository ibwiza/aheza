import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { FamilyModule } from './family/family.module';
import { MemberModule } from './member/member.module';
import { TypeModule } from './type/type.module';
import { ContributionModule } from './contribution/contribution.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwt_config } from './auth/config/jwt';
import { JwtStrategy } from './auth/jwt-strategy';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    DatabaseModule,
    FamilyModule,
    MemberModule,
    TypeModule,
    ContributionModule,
    AuthModule,
    EmailModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.register({
      secret: jwt_config.secret,
      signOptions: {
        expiresIn: jwt_config.expired,
      },
    }),
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy, AuthService],
})
export class AppModule {}
