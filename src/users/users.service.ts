import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { User } from './entities/user.entity';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { UsersQueryDto } from './dtos/users-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async paginate(usersQueryDto: UsersQueryDto): Promise<Pagination<User>> {
    const { limit, page, search, sortBy, sortOrder } = usersQueryDto;
    const paginationOptions: IPaginationOptions = { limit, page };

    let queryBuilder: SelectQueryBuilder<User> =
      this.usersRepository.createQueryBuilder('u');

    if (search) {
      queryBuilder = queryBuilder.andWhere(
        '(u.name LIKE :searchTerm OR u.surname LIKE :searchTerm OR u.email LIKE :searchTerm)',
        { searchTerm: `%${search}%` },
      );
    }

    if (sortBy) {
      queryBuilder = queryBuilder.orderBy(`u.${sortBy}`, sortOrder);
    }

    return paginate<User>(queryBuilder, paginationOptions);
  }
}
