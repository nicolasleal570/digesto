import 'dotenv/config'
import { DataSource, EntitySchema } from "typeorm";
import { env } from "./app/config/env.config.js";

export class Database {
  private static instance: DataSource;

  private constructor() {}

  public static getInstance(): DataSource {
    if (!Database.instance) {
      console.log("Setting up database connection..."); 

      console.log(env.db.database ? `Using "${env.db.database}" database...` : "No database has been found.")

      Database.instance = new DataSource({
        type: "postgres",
        host: env.db.host,
        port: env.db.port,
        username: env.db.username,
        password: env.db.password,
        database: env.db.database,
        synchronize: false,
        migrationsRun: true,
        logging: true,
        migrations: ["./migrations/*.js"],
      });
    }

    return Database.instance;
  }

  public static async loadEntities(entities: EntitySchema[]) {
    Database.getInstance();

    Database.instance.setOptions({
      entities,
    });

    if (!Database.instance.isInitialized) {
      await Database.instance.initialize();
    }
  }
}