/**
 * Error representing an unsupported column type from the YML file.
 */
export class UnsupportedColumnTypeError extends Error {
  constructor(yamlType: string) {
    const message = `Unsupported column type: "${yamlType}"`;
    super(message);

    // Fix the prototype chain (for instanceof checks to work correctly)
    Object.setPrototypeOf(this, UnsupportedColumnTypeError.prototype);
  }
}

/**
 * Error representing missing options for "select" type of column.
 */
export class SelectOptionsMissingError extends Error {
  constructor() {
    const message = `You need to provide options for the "select" column type`;
    super(message);

    // Fix the prototype chain (for instanceof checks to work correctly)
    Object.setPrototypeOf(this, UnsupportedColumnTypeError.prototype);
  }
}
