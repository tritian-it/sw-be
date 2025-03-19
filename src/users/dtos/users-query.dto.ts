import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class UsersQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsString()
  sortBy?: string;

  @IsOptional()
  @Transform(({ value }: { value: string }) => value.toUpperCase())
  @IsEnum(['ASC', 'DESC'], { message: 'sortOrder must be ASC or DESC' })
  sortOrder?: 'ASC' | 'DESC' = 'ASC';

  @IsOptional()
  @IsString()
  search?: string;
}
