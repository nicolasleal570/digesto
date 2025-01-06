export const env = {
  db: {
    host: process.env.DIGESTO_DATABASE_HOST ?? "localhost",
    port: Number(process.env.DIGESTO_DATABASE_PORT) || 5432,
    username: process.env.DIGESTO_DATABASE_USERNAME,
    password: process.env.DIGESTO_DATABASE_PASSWORD,
    database: process.env.DIGESTO_DATABASE_NAME,
  },
} as const;
