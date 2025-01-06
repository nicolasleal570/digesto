import { Hono } from "hono";
import { cors } from 'hono/cors'
import { logger } from "hono/logger";
import { entityRoutes } from "./routes/entity.routes.js";
import type { Services } from "./services/index.js";
import { HttpError } from "./errors/http.errors.js";
import { z } from "zod";

export function createApp(services: Services) {
  const app = new Hono();

  // Add middlewares
  app.use("*", logger());
  app.use("/api/*", cors());

  app.get("/", (c) => {
    return c.text("Hello Hono!");
  });

  // Register routes under /api/collections for handle entities dynamic
  const entityRouter = entityRoutes(services.entityService);
  app.route("/api/collections", entityRouter);

  // Error handling
  app.onError((err, c) => {
    
    if (err instanceof HttpError) {
      c.status(err.statusCode);
      return c.json({
        message: err.message,
        error: err.name,
        statusCode: err.statusCode,
      });
    }

    if(err instanceof z.ZodError) {
      c.status(400);
      return c.json({
        message: err.message,
        error: "ValidationError",
        statusCode: 400,
      });
    }
    
    console.error("Something goes wrong", err);
    c.status(500);
    return c.json({
      message: err.message ?? "Internal server error",
      error: "InternalServerError",
      statusCode: 500,
    });
  });

  return app;
}
