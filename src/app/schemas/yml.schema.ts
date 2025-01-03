import { z } from "zod";

export const columnTypeSchema = z.union([
  z.literal("int"),
  z.literal("number"),
  z.literal("varchar"),
  z.literal("date"),
  z.literal("timestamp"),
  z.literal("richText"),
]);

export const columnValidationOptionsSchema = z.object({
  required: z.boolean().optional(),
  min: z.number().optional(),
});

export const columnSchema = z.object({
  type: columnTypeSchema,
  length: z.number().optional(),
  primary: z.boolean().optional(),
  generated: z.union([
    z.literal(true),
    z.literal("uuid"),
    z.literal("rowid"),
    z.literal("increment"),
    z.undefined(),
  ]),
  validation: columnValidationOptionsSchema.optional(),
});

export const tableSchema = z.object({
  tableName: z.string(),
  columns: z.record(columnSchema),
});

export const ymlSchema = z.object({
  name: z.string(),
  tables: z.record(tableSchema),
});

export type YmlSchema = z.infer<typeof ymlSchema>;
