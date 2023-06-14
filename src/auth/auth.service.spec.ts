import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createMock } from '@golevelup/ts-jest';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserEntity } from '../users/entities/user.entity';
import { ERole } from '../users/enums/role.enum';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
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

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('should return false with wrong password', async () => {
      const pwd = '1234';
      await expect(authService.validateUser(user.email, pwd)).rejects.toThrow(new UnauthorizedException('User Or Password Is Incorrect'));
    });

    it('should return true', async () => {
      const authUser = await authService.validateUser(user.email, password);
      expect(authUser).toBe(user);
    });
  });
});