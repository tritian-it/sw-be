import { Controller, Get, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from './entities/user.entity';
import { UsersQueryDto } from './dtos/users-query.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index(
    @Query() usersQueryDto: UsersQueryDto,
  ): Promise<Pagination<User>> {
    return this.usersService.paginate(usersQueryDto);
  }
}
