import { Repository } from 'typeorm';
import {
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ERole } from './enums/role.enum';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ email });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const password = await argon2.hash(createUserDto.password);
      return await this.userRepository.save({ ...createUserDto, role: ERole.Member, password });
    } catch(e) {
      throw new UnprocessableEntityException(e.detail);
    }
  }
}
