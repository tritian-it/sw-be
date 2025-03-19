import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersQueryDto } from './dtos/users-query.dto';
import { paginate } from 'nestjs-typeorm-paginate';

jest.mock('nestjs-typeorm-paginate', () => ({
  paginate: jest.fn(),
}));

describe('UsersService', () => {
  let service: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should filter users by search term', async () => {
    const queryDto: UsersQueryDto = {
      limit: 10,
      page: 1,
      search: 'John',
    };

    const mockQueryBuilder = {
      andWhere: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
    };

    jest
      .spyOn(usersRepository, 'createQueryBuilder')
      .mockReturnValue(mockQueryBuilder as unknown as SelectQueryBuilder<User>);
    (paginate as jest.Mock).mockResolvedValue({ items: [], meta: {} });

    await service.paginate(queryDto);
    expect(mockQueryBuilder.andWhere).toHaveBeenCalledWith(
      '(u.name LIKE :searchTerm OR u.surname LIKE :searchTerm OR u.email LIKE :searchTerm)',
      { searchTerm: '%John%' },
    );
  });

  it('should sort users by specified column and order', async () => {
    const queryDto: UsersQueryDto = {
      limit: 10,
      page: 1,
      sortBy: 'name',
      sortOrder: 'ASC',
    };

    const mockQueryBuilder = {
      orderBy: jest.fn().mockReturnThis(),
    };

    jest
      .spyOn(usersRepository, 'createQueryBuilder')
      .mockReturnValue(mockQueryBuilder as unknown as SelectQueryBuilder<User>);
    (paginate as jest.Mock).mockResolvedValue({ items: [], meta: {} });

    await service.paginate(queryDto);
    expect(mockQueryBuilder.orderBy).toHaveBeenCalledWith('u.name', 'ASC');
  });
});
