import { ObjectLiteral, SelectQueryBuilder } from "typeorm";

export type Pagination<T> = {
  results: T[];
  meta: {
    currentPage: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
  };
};

export class PaginationService {
  async paginate({
    query,
    page,
    perPage,
  }: {
    query: SelectQueryBuilder<ObjectLiteral>;
    page: number;
    perPage: number;
  }): Promise<Pagination<ObjectLiteral>> {
    const totalItems = await query.getCount();
    const totalPages = Math.ceil(totalItems / perPage);

    if (totalPages > 0 && page > totalPages) {
      page = totalPages;
    }

    const offset = Math.max((page - 1) * perPage, 0);
    const results = await query.skip(offset).take(perPage).getMany();

    return {
      results,
      meta: {
        currentPage: page,
        perPage: perPage,
        totalPages,
        totalItems,
      },
    };
  }
}
