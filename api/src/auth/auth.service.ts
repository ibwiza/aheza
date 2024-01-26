import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto } from './dto/login.dto';
import { jwt_config } from './config/jwt';
import { v4 as uuidv4 } from 'uuid';
import { ResetDto } from './dto/reset.dto';
import { EmailService } from 'src/email/email.service';
import { NewPasswordDto } from './dto/new-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async register(data: RegisterDto) {
    const checkMemberExist = await this.databaseService.member.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!checkMemberExist)
      throw new HttpException(
        'Your not member of AHEZA SF contact GEARG staff for more information',
        HttpStatus.FORBIDDEN,
      );

    const checkUserExists = await this.databaseService.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (checkUserExists)
      throw new HttpException('User already registered', HttpStatus.FOUND);

    data.password = await hash(data.password, 12);
    const createUser = await this.databaseService.user.create({
      data: { ...data, memberId: checkMemberExist.id },
    });
    if (createUser) {
      return {
        statusCode: 200,
        message: 'Register Successfull',
      };
    }
  }

  async login(data: LoginDto) {
    const checkUserExists = await this.databaseService.user.findFirst({
      where: {
        email: data.email,
      },
    });

    const member = await this.databaseService.member.findUnique({
      where: { email: data.email },
    });

    if (!checkUserExists) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const checkPassword = await compare(
      data.password,
      checkUserExists.password,
    );

    if (checkPassword) {
      const accessToken = this.generateJWT({
        sub: checkUserExists.id,
        names: member.names,
        email: checkUserExists.email,
        role: checkUserExists.role,
      });

      return {
        statusCode: 200,
        message: 'Login successful',
        accessToken: accessToken,
      };
    } else {
      throw new HttpException(
        'User or password not match',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  generateJWT(payload: any) {
    return this.jwtService.sign(payload, {
      secret: jwt_config.secret,
      expiresIn: jwt_config.expired,
    });
  }

  async profile(email: string) {
    return await this.databaseService.user.findUnique({
      where: {
        email: email,
      },
      select: {
        email: true,
        role: true,
      },
    });
  }

  async reset(data: ResetDto) {
    const existingUser = await this.databaseService.user.findUnique({
      where: { email: data.email },
    });

    if (!existingUser) {
      throw new HttpException('Email not foung', HttpStatus.NOT_FOUND);
    }

    const passwordResetToken = await this.generatePasswordResetToken(
      data.email,
    );
    await this.emailService.sendReset(
      passwordResetToken.email,
      passwordResetToken.token,
    );


    return { statusCode: 200, message: 'Reset email sent!' };
  }

  async generatePasswordResetToken(email: string) {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await this.getPasswordResetTokenByEmail(email);

    if (existingToken) {
      await this.databaseService.passwordResetToken.delete({
        where: { id: existingToken.id },
      });
    }

    const passwordResetToken =
      await this.databaseService.passwordResetToken.create({
        data: {
          email,
          token,
          expires,
        },
      });

    return passwordResetToken;
  }

  async getPasswordResetTokenByEmail(email: string) {
    try {
      const passwordResetToken =
        await this.databaseService.passwordResetToken.findFirst({
          where: { email },
        });

      return passwordResetToken;
    } catch {
      return null;
    }
  }

  async newPassword(data: NewPasswordDto, token: string) {
    if (!token) throw new HttpException('Missing token!', HttpStatus.NOT_FOUND);
    const existingToken = await this.getPasswordResetTokenByToken(token);
    if (!existingToken)
      throw new HttpException('Invalid token!', HttpStatus.NOT_FOUND);
    const hasExpired = new Date(existingToken.expires) < new Date();
    if (hasExpired)
      throw new HttpException('Token has expired!', HttpStatus.NOT_FOUND);

    const existingUser = await this.databaseService.user.findUnique({
      where: { email: existingToken.email },
    });
    if (!existingUser) {
      throw new HttpException('Email does not exist!', HttpStatus.NOT_FOUND);
    }
    const hashedPassword = await hash(data.password, 12);
    await this.databaseService.user.update({
      where: { id: existingUser.id },
      data: { password: hashedPassword },
    });

    await this.databaseService.passwordResetToken.delete({
      where: { id: existingToken.id },
    });
    return { statusCode: 200, message: 'Password updated!' };
  }

  async getPasswordResetTokenByToken(token: string) {
    try {
      const passwordResetToken =
        await this.databaseService.passwordResetToken.findUnique({
          where: { token },
        });

      return passwordResetToken;
    } catch {
      return null;
    }
  }
}
