import { EntityService } from "./entity.service.js";
import { HashingService } from "./hashing.service.js";
import { PaginationService } from "./pagination.service.js";
import { SchemaValidationService } from "./schema-validation.service.js";
import type { YmlService } from "./yml.service.js";

export interface Services {
  entityService: EntityService;
  ymlService: YmlService;
  schemaValidationService: SchemaValidationService;
  hashingService: HashingService;
  paginationService: PaginationService;
}
