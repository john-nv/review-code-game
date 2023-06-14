import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../users/entities/user.entity';
import { AuthController } from './auth.controller';
import { ERole } from '../users/enums/role.enum';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;
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
  const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn().mockResolvedValue(user),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue(token),
          },
        },
      ],
    }).compile();
    authController = moduleRef.get<AuthController>(AuthController);
    authService = moduleRef.get<AuthService>(AuthService);
  });

  describe('signin', () => {
    it('should be login failed', async () => {
      const signInDto: SignInDto  = { email: user.email, password: '1234' };
      jest.spyOn(authService, 'validateUser').mockResolvedValue(null);

      await expect(authController.signin(signInDto)).rejects.toThrow(new UnauthorizedException('sign failed!'));
    });

    it('should be login successfully', async () => {
      const signInDto: SignInDto  = { email: user.email, password };
      const { accessToken }  = await authController.signin(signInDto);

      expect(accessToken).toBe(token);
    });
  });
});
