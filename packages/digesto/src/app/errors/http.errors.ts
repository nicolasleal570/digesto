import type { StatusCode } from "hono/utils/http-status";

/**
 * Base class for HTTP-related errors, carrying a status code.
 */
export class HttpError extends Error {
  public statusCode: StatusCode;

  constructor(message: string, statusCode: StatusCode) {
    super(message);
    this.statusCode = statusCode;

    // Fix the prototype chain (for instanceof checks to work correctly)
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

/**
 * Error representing a 404 - Not Found situation.
 */
export class NotFoundError extends HttpError {
  constructor(message = "Not Found") {
    super(message, 404);
    this.name = "NotFoundError"
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Error representing a 403 - Forbidden situation.
 */
export class ForbiddenError extends HttpError {
  constructor(message = "Forbidden") {
    super(message, 403);
    this.name = "ForbiddenError"
    Object.setPrototypeOf(this, ForbiddenError.prototype);
  }
}

/**
 * Error representing a 401 - Unauthorized situation.
 */
export class UnauthorizedError extends HttpError {
  constructor(message = "Unauthorized") {
    super(message, 401);
    this.name = "UnauthorizedError"
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
  }
}
