import { z } from "zod";
import {
  YmlColumnSchema,
  YmlColumnTypeSchema,
  YmlTableSchema,
  YmlValidationSchema,
} from "../schemas/yml.schema.js";

/**
 * Maps the base type from the column definition to a corresponding Zod schema.
 */
function mapBaseTypeToZod(type: YmlColumnTypeSchema): z.ZodTypeAny {
  switch (type) {
    case "int": {
      return z.number().int();
    }

    case "number":
    case "decimal": {
      return z.number();
    }

    case "string":
    case "textarea":
    case "richText": {
      return z.string();
    }

    case "email": {
      return z.string().email();
    }

    case "url": {
      return z.string().url();
    }

    case "password": {
      return z.string().min(6);
    }

    case "date":
    case "timestamp": {
      return z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) {
          return new Date(arg);
        }
      }, z.date());
    }

    case "boolean": {
      return z.boolean();
    }

    default: {
      return z.any();
    }
  }
}

/**
 * Applies string-specific validations to a ZodString schema.
 */
function applyStringValidation(
  schema: z.ZodString,
  validations: YmlValidationSchema
): z.ZodString {
  const { min, max } = validations;
  if (typeof min === "number") {
    schema = schema.min(min, { message: `Must be at least ${min} characters` });
  }
  if (typeof max === "number") {
    schema = schema.max(max, { message: `Must be at most ${max} characters` });
  }
  return schema;
}

/**
 * Applies number-specific validations to a ZodNumber schema.
 */
function applyNumberValidation(
  schema: z.ZodNumber,
  validations: YmlValidationSchema
): z.ZodNumber {
  const { min, max } = validations;
  if (typeof min === "number") {
    schema = schema.min(min, { message: `Must be at least ${min}` });
  }
  if (typeof max === "number") {
    schema = schema.max(max, { message: `Must be at most ${max}` });
  }
  return schema;
}

/**
 * Applies generic validations based on the schema type.
 */
function applyValidations(
  schema: z.ZodTypeAny,
  validations: YmlValidationSchema
) {
  if (schema instanceof z.ZodString) {
    schema = applyStringValidation(schema, validations);
  }
  if (schema instanceof z.ZodNumber) {
    schema = applyNumberValidation(schema, validations);
  }

  // Handle optional fields (if not required)
  if (!validations.required) {
    schema = schema.optional();
  }

  return schema;
}

/**
 * Converts a column definition to a Zod schema, including type mapping and validations.
 */
export function getZodForColumn(columnDef: YmlColumnSchema) {
  let schema = mapBaseTypeToZod(columnDef.type);
  if (columnDef.validation) {
    schema = applyValidations(schema, columnDef.validation);
  }

  return schema;
}

/**
 * Builds a Zod object schema for a table definition.
 */
export function buildTableSchema(tableDef: YmlTableSchema) {
  const columns = tableDef.columns;
  const shape: Record<string, ReturnType<typeof getZodForColumn>> = {};

  for (const [columnName, columnDef] of Object.entries(columns)) {
    shape[columnName] = getZodForColumn(columnDef);
  }

  return z.object(shape).strict();
}
