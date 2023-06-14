import {
  Body,
  Controller,
  Delete,  // khong dung thi xoa
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { Public } from '../auth/decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express'; // xap xep lai import cho ro rang

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
  ) {}

  @Public()
  @Post()
  // logic chuyen vao service
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
