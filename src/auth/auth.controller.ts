import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/sign-in.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('signin')
  async signin(@Body() signInDto: SignInDto) {
    const user = await this.authService.validateUser(
      signInDto.email,
      signInDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('sign failed!');
    }
    const accessToken = this.jwtService.sign({ user });
    return { accessToken };
  }

  @Public()
  @Delete('signout')
  async signout(
    @Req() request: Request
  ) {
    return { ok: true, message: 'Logout successfully!' };
  }
}
