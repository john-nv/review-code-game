import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('User Or Password Is Incorrect');
    }
    const hasPassed = await argon2.verify(user.password, password);

    if (!hasPassed) {
      throw new UnauthorizedException('User Or Password Is Incorrect');
    }

    return user;
  }
}
