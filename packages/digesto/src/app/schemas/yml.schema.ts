import { z } from "zod";

export const columnTypeSchema = z.union([
  z.literal("string"),
  z.literal("textarea"),
  z.literal("richText"),
  z.literal("int"),
  z.literal("number"),
  z.literal("decimal"),
  z.literal("url"),
  z.literal("email"),
  z.literal("date"),
  z.literal("timestamp"),
  z.literal("boolean"),
  z.literal("password"),
  z.literal("select"),
]);

export const columnValidationOptionsSchema = z.object({
  required: z.boolean().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
});

// Define the base column schema
const baseColumnSchema = z.object({
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

export const columnSchema = baseColumnSchema
  .extend({
    options: z.array(z.string()).optional(),
  })
  .refine(
    (data) =>
      data.type !== "select" || (data.options && data.options.length > 0),
    {
      message:
        'A list of "options" is required and must be a non-empty array for columns of type "select".',
      path: ["options"],
    }
  )
  .refine((data) => data.type !== "select" || data.generated === undefined, {
    message: '"generated" is not allowed for columns of type "select".',
    path: ["generated"],
  })
  .refine((data) => data.type !== "select" || data.primary === undefined, {
    message: '"primary" is not allowed for columns of type "select".',
    path: ["primary"],
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
export type YmlTableSchema = z.infer<typeof tableSchema>;
export type YmlColumnSchema = z.infer<typeof columnSchema>;
export type YmlColumnTypeSchema = z.infer<typeof columnTypeSchema>;
export type YmlValidationSchema = z.infer<typeof columnValidationOptionsSchema>;
