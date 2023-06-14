import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './users/decorators/roles.decorator';
import { ERole } from './users/enums/role.enum';
import { RolesGuard } from './users/guards/roles.guard';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Roles(ERole.Member)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
