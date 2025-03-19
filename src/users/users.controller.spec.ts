import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';
import { UsersQueryDto } from './dtos/users-query.dto';
import { validate } from 'class-validator';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            paginate: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return paginated users', async () => {
    const queryDto: UsersQueryDto = {
      limit: 10,
      page: 1,
    };

    const mockPagination: Pagination<User> = {
      items: [],
      meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: queryDto.limit,
        totalPages: 0,
        currentPage: queryDto.page,
      },
    };

    const paginateSpy = jest
      .spyOn(usersService, 'paginate')
      .mockResolvedValue(mockPagination);

    const result = await controller.index(queryDto);
    expect(result).toEqual(mockPagination);
    expect(paginateSpy).toHaveBeenCalledWith(queryDto);
  });

  describe('UsersQueryDto validation', () => {
    it('should pass validation for valid input', async () => {
      const queryDto = new UsersQueryDto();
      queryDto.page = 2;
      queryDto.limit = 20;
      queryDto.sortBy = 'name';
      queryDto.sortOrder = 'ASC';
      queryDto.search = 'John';

      const errors = await validate(queryDto);
      expect(errors.length).toBe(0);
    });

    it('should apply default values if not provided', async () => {
      const queryDto = new UsersQueryDto();
      const errors = await validate(queryDto);
      expect(errors.length).toBe(0);
      expect(queryDto.page).toBe(1);
      expect(queryDto.limit).toBe(10);
      expect(queryDto.sortOrder).toBe('ASC');
    });

    it('should fail validation for invalid page and limit', async () => {
      const queryDto = new UsersQueryDto();
      queryDto.page = 0;
      queryDto.limit = -5;

      const errors = await validate(queryDto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'page')).toBe(true);
      expect(errors.some((e) => e.property === 'limit')).toBe(true);
    });

    it('should fail validation for invalid sortOrder', async () => {
      const queryDto = new UsersQueryDto();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      queryDto.sortOrder = 'INVALID' as any;

      const errors = await validate(queryDto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'sortOrder')).toBe(true);
    });

    it('should fail validation for non-string sortBy', async () => {
      const queryDto = new UsersQueryDto();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      queryDto.sortBy = 123 as any;

      const errors = await validate(queryDto);
      expect(errors.length).toBeGreaterThan(0);
      expect(errors.some((e) => e.property === 'sortBy')).toBe(true);
    });
  });
});
