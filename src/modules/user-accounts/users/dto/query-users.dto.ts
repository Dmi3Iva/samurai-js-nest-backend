import { IsInt, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IFindUserQuery } from '../infrastructure/find-user.query.js';
import { ESortDirection } from '../../../../core/enums/sort-direction.enum.js';

export class QueryUsersDTO {
  @IsString()
  @IsOptional()
  sortBy: string;

  @IsString()
  @IsOptional()
  sortDirection: ESortDirection = ESortDirection.Desc;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pageNumber: number = 1;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  pageSize: number = 10;

  @IsString()
  @IsOptional()
  searchLoginTerm: string;

  @IsString()
  @IsOptional()
  searchEmailTerm: string;

  mapToRepositoryQuery(): IFindUserQuery {
    const result: IFindUserQuery = {
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      searchLoginTerm: this.searchLoginTerm,
      searchEmailTerm: this.searchEmailTerm,
    };

    return result;
  }
}
