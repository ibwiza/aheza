import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './auth.guard';
import { ResetDto } from './dto/reset.dto';
import { NewPasswordDto } from './dto/new-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  async register(@Body() data: RegisterDto) {
    return await this.authService.register(data);
  }

  @Post('sign-in')
  async login(@Body() data: LoginDto) {
    return await this.authService.login(data);
  }

  @Post('reset')
  async reset(@Body() data: ResetDto) {
    return await this.authService.reset(data);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async profile(@Req() req) {
    return await this.authService.profile(req.user.email);
  }

  @Patch('/newPassword/:token')
  async newPassword(
    @Body() data: NewPasswordDto,
    @Param('token') token: string,
  ) {
    return await this.authService.newPassword(data, token);
  }
}
