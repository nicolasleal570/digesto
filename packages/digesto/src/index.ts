import "reflect-metadata";

import { z } from "zod";
import { serve } from "@hono/node-server";

import { Database } from "./datasource.js";
import { createApp } from "./app/app.js";

// Repositories
import { EntityRepository } from "./app/repositories/entity.repository.js";
import { YmlRepository } from "./app/repositories/yml.repository.js";

// Services
import { EntityService } from "./app/services/entity.service.js";
import type { Services } from "./app/services/index.js";
import { YmlService } from "./app/services/yml.service.js";

// Utils
import { buildEntitySchemas } from "./app/utils/build-entities.js";
import { UnsupportedColumnTypeError } from "./app/errors/schema.errors.js";
import { SchemaValidationService } from "./app/services/schema-validation.service.js";
import { HashingService } from "./app/services/hashing.service.js";
import { PaginationService } from "./app/services/pagination.service.js";

export async function bootstrap() {
  try {
    const paginationService = new PaginationService();
    const ymlRepository = new YmlRepository();
    const ymlService = new YmlService(ymlRepository);

    const ymlContent = ymlService.load();

    const schemaValidationService = new SchemaValidationService(ymlService);

    const hashingService = new HashingService(ymlService);

    const entities = buildEntitySchemas(ymlContent);

    // 1. Load entities
    await Database.loadEntities(entities);

    // 2. Create repository and service instances
    const dataSource = Database.getInstance();
    const entityRepository = new EntityRepository(dataSource);
    const entityService = new EntityService(
      entityRepository,
      schemaValidationService,
      hashingService,
      paginationService
    );

    const services: Services = {
      entityService,
      ymlService,
      schemaValidationService,
      hashingService,
      paginationService,
    };

    // 3. Create the app
    const app = createApp(services);

    // 4. Serve
    const port = Number(process.env.DIGESTO_SERVER_PORT) || 5555;
    serve({ fetch: app.fetch, port }, (info) => {
      console.log(`Server running at http://localhost:${info.port}`);
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Error loading the YML file");
      console.error(error.errors);
      return;
    }

    if (error instanceof UnsupportedColumnTypeError) {
      console.error("Error loading the YML file");
      console.error(error.message);
      return;
    }

    console.error("Failed to start the server", error);
  }
}
