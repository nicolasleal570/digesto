# Change Log

## [Unreleased]

### Fixed
- Fix pagination logic to prevent negative offsets and ensure valid page numbers.

### Added
- Add pagination support to entity service and routes.
- Add support for "select" column type with validation for options.
- Add support for password column type and implement validation and hashing for sensitive data.
- Add mapping to support link and email as column types.
- Add UnsupportedColumnTypeError and enhance YAML type mapping to support multiple kinds of numbers.
- Add support for multiple kinds of strings.
- Add a real-life use case example

### Changed
- Refactor entity service to use dedicated schema validation and hashing services.
- Enhance entity routes and schemas to support boolean column type and increase default result limit.
- Enhance validation and schema handling in Digesto.

## [0.0.5] - 2023-09-15
### Added
- Initial release of the project.
- Implemented core features and functionalities.