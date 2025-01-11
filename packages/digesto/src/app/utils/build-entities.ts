import { EntitySchema, type ColumnType, type EntitySchemaColumnOptions } from "typeorm";
import type { YmlSchema } from "../schemas/yml.schema.js";

/**
 * Dynamically creates an array of TypeORM EntitySchemas from your YAML config.
 */
export function buildEntitySchemas(ymlContent: YmlSchema): EntitySchema[] {
  const { tables } = ymlContent;
  const schemas: EntitySchema[] = [];

  for (const entityKey in tables) {
    const tableDef = tables[entityKey];

    const tableName = tableDef.tableName || entityKey.toLowerCase();

    const columns: { [columnName: string]: EntitySchemaColumnOptions } = {};

    for (const propKey in tableDef.columns) {
      const propDef = tableDef.columns[propKey];

      columns[propKey] = {
        name: propKey,
        type: mapYamlTypeToTypeORM(propDef.type),
        primary: !!propDef.primary,
        generated: propDef.generated,
        length: propDef.length,
        nullable: !propDef.primary, // TODO: Review this behavior
      };
    }

    const entitySchema = new EntitySchema({
      name: entityKey,
      tableName,
      columns,
    });

    schemas.push(entitySchema);
  }

  return schemas;
}

/**
 * Maps our YAML property types (e.g., "varchar", "number", "timestamp")
 * to TypeORM recognized types (e.g., "varchar", "int", "timestamp", etc.).
 */
function mapYamlTypeToTypeORM(yamlType: string): ColumnType {
  switch (yamlType) {
    case "string":
      return "varchar";
    case "number":
    case "int":
      return "int";
    case "date":
      return "date";
    case "timestamp":
      return "timestamp";
    case "textarea":
    case "richText":
      return "text";
    default:
      return "varchar"; // fallback
  }
}
