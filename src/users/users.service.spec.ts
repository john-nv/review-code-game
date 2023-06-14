import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMock } from '@golevelup/ts-jest';
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { ERole } from './enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let usersService: UsersService;
  const userId: string = '92375ae6-eee7-4f1f-bab0-f67a390beb91';
  const password: string = 'admin';
  const user: UserEntity = {
    id: userId,
    email: 'admin@mail.com',
    password: '$argon2id$v=19$m=65536,t=3,p=4$IonmNp+o2P/sxjQYPmKZrw$M+hxdEP1OfTPuA8b++8KVPcArvdC7xBta+Zzmj2GtAI',
    name: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
    role: ERole.Member,
    avatar: null,
    toJSON: (): UserEntity => {
      return this;
    }
  };
  const userRepo = createMock<Repository<UserEntity>>({
    save: jest.fn().mockReturnValue(user),
    findOneBy: jest.fn().mockReturnValue(user),
  });

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: userRepo,
        },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
  });

  describe('create', () => {
    it('should create a user successfully', async () => {
      const createUserDto: CreateUserDto = { email: user.email, name: user.name, password, role: ERole.Member };
      const newUser = await usersService.create(createUserDto);
      expect(newUser).toBe(user);
    });
  });

  describe('findByEmail', () => {
    it('should return null', async () => {
      jest.spyOn(userRepo as any, 'findOneBy').mockResolvedValueOnce(null);
      const foundUser = await usersService.findByEmail(user.email);
      expect(foundUser).toBe(null);
    });

    it('should return a user', async () => {
      const foundUser = await usersService.findByEmail(user.email);
      expect(foundUser).toBe(user);
    });
  });
});

