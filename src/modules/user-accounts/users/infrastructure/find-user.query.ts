import { ESortDirection } from '../../../../core/enums/sort-direction.enum.js';

export interface IFindUserQuery {
  sortBy: string;
  sortDirection: ESortDirection;
  pageNumber: number;
  pageSize: number;
  searchLoginTerm: string;
  searchEmailTerm: string;
}
