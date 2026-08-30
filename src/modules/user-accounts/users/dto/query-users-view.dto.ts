export class QueryUsersResultViewDTO {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: {
    id: string;
    login: string;
    email: string;
    createdAt: Date;
  }[];
}
