import { Test } from '@nestjs/testing';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { ERole } from './enums/role.enum';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
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
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn().mockResolvedValue(user),
          },
        },
      ],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
  });

  describe('create',  () => {
    it('should create a user successfully', async () => {
      const createUserDto: CreateUserDto = { email: user.email, name: user.name, password, role: ERole.Member };
      const newUser = await usersController.create(createUserDto);
      expect(newUser).toBe(user);
    });
  });
});