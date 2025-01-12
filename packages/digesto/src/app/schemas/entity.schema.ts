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

export const getAllQueryParamsSchema = z.object({
  page: z.string().regex(/^\d+$/, "Page must be a valid positive integer").optional(),
  perPage: z.string().regex(/^\d+$/, "Per page must be a valid positive integer").optional(),
});

export type GetAllQueryParamsSchema = z.infer<typeof getAllQueryParamsSchema>;
