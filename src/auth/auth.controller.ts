import {
  Body,
  Controller,
  Delete,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService, // nen su dung readonly
    private authService: AuthService, // nen su dung readonly
  ) {}

  @Public()
  @Post('signin')
  // khong duoc viet su ly logic o controller, controller la de dieu huong den service
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
  // khong duoc viet su ly logic o controller, controller la de dieu huong den service
  async signout(
    @Req() request: Request // xu ly gi o day ?
  ) {
    // doi voi cac xu ly da duoc xac thuc nen xu dung (HttpException, HttpStatus => common)
    // dat ten ro rang, ok la gi, sua lai status
    return { ok: true, message: 'Logout successfully!' }; 
  }
}
