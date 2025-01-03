import { DataSource, type ObjectLiteral, Repository } from 'typeorm';
import { NotFoundError } from '../errors/http.errors.js';

export class EntityRepository {
  private readonly dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  /**
   * Gets the repository for the given table name.
   */
  private getRepository(tableName: string): Repository<ObjectLiteral> {
    const entityMetadata = this.dataSource.entityMetadatas.find(
      (item) => item.tableName === tableName
    );

    if (!entityMetadata) {
      throw new NotFoundError(`Entity "${tableName}" not found`);
    }

    return this.dataSource.getRepository(entityMetadata.target);
  }

  /**
   * Retrieves a list of rows from a table, limited by `limit`.
   */
  public async findAll(tableName: string, limit = 10): Promise<ObjectLiteral[]> {
    return this.getRepository(tableName)
      .createQueryBuilder(tableName)
      .take(limit)
      .getMany();
  }

  /**
   * Retrieves a single row by ID.
   */
  public async findOne(
    tableName: string, 
    id: string | number
  ): Promise<ObjectLiteral | null> {
    return this.getRepository(tableName)
      .createQueryBuilder(tableName)
      .where(`${tableName}.id = :id`, { id })
      .getOne();
  }

  /**
   * Creates and saves a new entity row.
   */
  public async create(
    tableName: string, 
    data: Record<string, any>
  ): Promise<ObjectLiteral> {
    const repository = this.getRepository(tableName);
    const newItem = repository.create(data);
    return repository.save(newItem);
  }

  /**
   * Saves an existing entity row (for updates).
   */
  public async save(
    tableName: string, 
    item: ObjectLiteral
  ): Promise<ObjectLiteral> {
    return this.getRepository(tableName).save(item);
  }

  /**
   * Deletes a row by ID.
   */
  public async delete(
    tableName: string, 
    id: string | number
  ): Promise<boolean> {
    const result = await this.getRepository(tableName).delete(id);
    return result.affected !== 0;
  }
}
