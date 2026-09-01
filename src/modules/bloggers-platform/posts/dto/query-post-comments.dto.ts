import { ESortDirection } from '#src/core/enums/sort-direction.enum.js';
import { IFindUserQuery } from '#src/modules/user-accounts/users/infrastructure/find-user.query.js';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsInt } from 'class-validator';

export class QueryPostCommentsDTO {
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
