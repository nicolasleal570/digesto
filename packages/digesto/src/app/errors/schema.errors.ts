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
