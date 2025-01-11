import { z } from "zod";

export const tableNameParam = z.string({
  invalid_type_error: "Entity table name is required.",
  required_error: "Entity table name is required.",
});

export const idParam = z.string({
  invalid_type_error: "Entity ID is required.",
  required_error: "Entity ID is required.",
});

export const getAllEntitySchema = z
  .object({
    tableName: tableNameParam,
  })
  .strict();

export const getOneEntitySchema = z
  .object({
    id: idParam,
    tableName: tableNameParam,
  })
  .strict();

export const createEntitySchema = getAllEntitySchema;
export const updateEntitySchema = getOneEntitySchema;
export const deleteEntitySchema = getOneEntitySchema;
