import { EntityService } from "./entity.service.js";
import type { YmlService } from "./yml.service.js";

export interface Services {
  entityService: EntityService;
  ymlService: YmlService;
}
