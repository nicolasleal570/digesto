/**
 * THIS FILE IS ONLY USED BY THE TYPEORM CLI TO GENERATE AND RUN MIGRATIONS.
 */

import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import * as fs from "fs";
import * as yaml from "js-yaml";

import { env } from "./app/config/env.config.js";
import { ymlSchema } from "./app/schemas/yml.schema.js";
import { buildEntitySchemas } from "./app/utils/build-entities.js";

const fileLocation = `${process.cwd()}/backend/api.yml`;
const raw = fs.readFileSync(fileLocation, "utf-8");

const parsedYml = ymlSchema.parse(yaml.load(raw));

const entitySchemas = buildEntitySchemas(parsedYml);

const migrationsLocation = `${process.cwd()}/src/migrations/*.ts`;

const dataSource = new DataSource({
  type: "postgres",
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: false,
  migrationsRun: true,
  logging: true,
  migrations: [migrationsLocation],
  entities: entitySchemas
});

export default dataSource;
