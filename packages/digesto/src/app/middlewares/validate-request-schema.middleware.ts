import { createMiddleware } from "hono/factory";

/**
 * Validate schema function
 * @description This function is used to validate request data using Zod library.
 * @param {'body' | 'params'} property This property is used to find the data into the express request object.
 * @param {Zod.ZodSchema} schema Zoz schema to make the validations.
 * @returns
 */
export function validateSchema(
  property: "body" | "params",
  schema: Zod.ZodSchema
) {
  return createMiddleware(async (c, next) => {
    let dataToValidate: unknown;

    if (property === "body") {
      dataToValidate = await c.req.json();
    }

    if (property === "params") {
      dataToValidate = c.req.param();
    }

    // Check data and throw an error if its not valid
    schema.parse(dataToValidate);

    // Only execute if data is correctly. If not, the error handler catch errors
    await next();
  });
}
