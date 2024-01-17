import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare, hash } from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { DatabaseService } from 'src/database/database.service';
import { LoginDto } from './dto/login.dto';
import { jwt_config } from './config/jwt';

@Injectable()
export class AuthService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
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
      data: data,
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
        cid: true,
      },
    });
  }
}
