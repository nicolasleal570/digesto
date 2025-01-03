import { NotFoundError } from "../errors/http.errors.js";
import { EntityRepository } from "../repositories/entity.repository.js";
import type { ObjectLiteral } from "typeorm";

export class EntityService {
  private readonly entityRepository: EntityRepository;

  constructor(entityRepository: EntityRepository) {
    this.entityRepository = entityRepository;
  }

  /**
   * Retrieves a list of entities from the specified table, limited by `limit`.
   */
  public async getAll(tableName: string, limit = 10): Promise<ObjectLiteral[]> {
    return this.entityRepository.findAll(tableName, limit);
  }

  /**
   * Retrieves a single entity by its ID.
   */
  public async getOne(
    tableName: string,
    id: string | number
  ): Promise<ObjectLiteral> {
    const item = await this.entityRepository.findOne(tableName, id);
    if (!item) {
      throw new NotFoundError("Item not found");
    }
    return item;
  }

  /**
   * Creates a new entity in the specified table.
   */
  public async create(
    tableName: string,
    data: Record<string, any>
  ): Promise<ObjectLiteral> {
    return this.entityRepository.create(tableName, data);
  }

  /**
   * Updates an existing entity by its ID.
   */
  public async update(
    tableName: string,
    id: string | number,
    data: Record<string, any>
  ): Promise<ObjectLiteral> {
    // Validate the item first
    const existingItem = await this.getOne(tableName, id);

    const updatedItem = {
      ...existingItem,
      ...data,
    };

    return this.entityRepository.save(tableName, updatedItem);
  }

  /**
   * Deletes an entity by its ID.
   */
  public async delete(
    tableName: string,
    id: string | number
  ): Promise<{ ok: boolean }> {
    // Check existence
    await this.getOne(tableName, id);

    const success = await this.entityRepository.delete(tableName, id);
    if (!success) {
      throw new Error("Delete operation failed");
    }

    return { ok: true };
  }
}
