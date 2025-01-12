import * as bcrypt from "bcrypt";
import { YmlService } from "./yml.service.js";

export class HashingService {
  constructor(private readonly ymlService: YmlService) {}

  hashSensitiveColumns(tableName: string, data: Record<string, unknown>) {
    const tableSchema = this.getTableSchemaByTableName(tableName);

    if (!tableSchema) {
      throw new Error(`Table schema for ${tableName} not found.`);
    }

    const sensitiveFields = Object.entries(tableSchema.columns).filter(
      ([_, item]) => item.type === "password"
    );

    if (sensitiveFields.length === 0) {
      return data; // No sensitive fields to hash
    }

    const saltRounds = 10;
    sensitiveFields.forEach(([fieldName]) => {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(data[fieldName] as string, salt);
      data[fieldName] = hash;
    });

    return data;
  }

  private getTableSchemaByTableName(tableName: string) {
    const ymlContent = this.ymlService.parsedContent;
    return Object.values(ymlContent?.tables ?? {}).find(
      (item) => item.tableName === tableName
    );
  }
}
