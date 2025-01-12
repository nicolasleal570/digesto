import { Hono } from "hono";
import { EntityService } from "../services/entity.service.js";
import { validateSchema } from "../middlewares/validate-request-schema.middleware.js";
import {
  getAllEntitySchema,
  getOneEntitySchema,
  createEntitySchema,
  updateEntitySchema,
  deleteEntitySchema,
  getAllQueryParamsSchema,
  GetAllQueryParamsSchema,
} from "../schemas/entity.schema.js";

/**
 * Creates a set of routes for CRUD operations on entities in the database.
 *
 * @function
 * @name entityRoutes
 * @description A factory function that generates Hono routes for managing entity records,
 * using the provided EntityService to interact with the underlying database. These routes
 * handle listing entities, retrieving an entity by ID, creating new entities, updating
 * existing entities, and deleting entities.
 *
 * @param {EntityService} entityService - An instance of the EntityService class, which
 * provides methods for retrieving and manipulating entities in the database.
 *
 * @returns {Hono} - A configured Hono router instance with CRUD endpoints for entities.
 */
export function entityRoutes(entityService: EntityService): Hono {
  const router = new Hono();

  router.get(
    "/:tableName",
    validateSchema("params", getAllEntitySchema),
    validateSchema("query", getAllQueryParamsSchema),
    async (c) => {
      const query = c.req.query() as GetAllQueryParamsSchema;
      const tableName = c.req.param("tableName");
      const results = await entityService.getAll(tableName, query);
      return c.json(results);
    }
  );

  router.get(
    "/:tableName/:id",
    validateSchema("params", getOneEntitySchema),
    async (c) => {
      const tableName = c.req.param("tableName");
      const itemId = c.req.param("id");

      const item = await entityService.getOne(tableName, itemId);
      return c.json(item);
    }
  );

  router.post(
    "/:tableName",
    validateSchema("params", createEntitySchema),
    async (c) => {
      const tableName = c.req.param("tableName");
      const body = await c.req.json();

      const savedItem = await entityService.create(tableName, body);
      c.status(201);
      return c.json(savedItem);
    }
  );

  router.put(
    "/:tableName/:id",
    validateSchema("params", updateEntitySchema),
    async (c) => {
      const tableName = c.req.param("tableName");
      const itemId = c.req.param("id");
      const body = await c.req.json();

      const updatedItem = await entityService.update(tableName, itemId, body);
      return c.json(updatedItem);
    }
  );

  router.delete(
    "/:tableName/:id",
    validateSchema("params", deleteEntitySchema),
    async (c) => {
      const tableName = c.req.param("tableName");
      const itemId = c.req.param("id");

      const result = await entityService.delete(tableName, itemId);

      return c.json(result);
    }
  );

  return router;
}
