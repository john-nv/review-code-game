import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: true,
    });
  }

  validate(email: string, password: string) {
    const user = this.authService.validateUser(email, password);
    if (!user) {
      // UnauthorizedException neu validateUser gap loi chuong trinh se bi crash
      // bat buoc su dung try catch
      throw new UnauthorizedException('sign failed!');
    }
    return user;
  }
}
