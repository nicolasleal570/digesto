# Digesto YAML Configuration Reference

This document illustrates how to define your data model using a **real-life example**. By declaring entities, columns, and validations in a single `.yml` file, you let Digesto handle the underlying database creation, data validation, **and CRUD operations** automatically.

---

## Real-Life Use Case Example

Below is a sample **`CatalogItem`** entity that showcases a variety of column types and validation rules. In a real application, you might have multiple entities—this is just one illustrative example.

```yaml
name: My Storefront
tables:
  CatalogItem:
    tableName: catalog_items
    columns:
      id:
        type: int
        primary: true
        generated: true

      name:
        type: string
        validation:
          required: true

      description:
        type: textarea
        validation:
          required: true

      details:
        type: richText
        validation:
          required: false

      price:
        type: number
        validation:
          min: 0

      quantity:
        type: int

      discount:
        type: decimal

      productLink:
        type: url
        validation:
          required: false

      contactEmail:
        type: email
        validation:
          required: true

      releaseDate:
        type: date
        validation:
          required: true

      lastRestock:
        type: timestamp
        validation:
          required: false

      isActive:
        type: boolean
        validation:
          required: true

      adminCode:
        type: password
        validation:
          required: true

      category:
        type: select
        options:
          - Clothing
          - Electronics
          - Kitchen
        validation:
          required: true
```

---

## Structure and Definitions

### 1. **Root-Level Keys**

- **`name`**  
  Defines a human-readable name for your overall application. In the example, `"My Storefront"` represents the project name.

- **`tables`**  
  Maps your entity names to their configurations. Here, we have a single entity, **`CatalogItem`**, but you can define multiple entities under `tables`.

### 2. **Entity Definition: `CatalogItem`**

- **`tableName`**: Defines the actual name of the table in the database (`catalog_items`).  
- **`columns`**: A mapping of column names to their types and validations.

Within `columns`, each field is defined with:

- **`type`**: The data type for this column.
- **`validation`**: Optional rules that specify constraints like `required`, `min`, etc.
- **`options`** (if `type: select`): A list of allowed values.

---

## Column Types Used in This Example

1. **int**
   - Example: `id`, `quantity`
   - Can be marked `primary: true` and `generated: true` for auto-incrementing IDs.

2. **string**
   - Example: `name`
   - General-purpose text field. Combined with `required: true` to ensure it’s always filled.

3. **textarea**
   - Example: `description`
   - Suited for multi-line or longer text input.

4. **richText**
   - Example: `details`
   - Allows storing HTML or formatted text. Often sanitized in your application.

5. **number**
   - Example: `price`
   - A numeric (float/double) field. Here, `min: 0` ensures the price cannot be negative.

6. **int** (again for `quantity`)
   - Strictly integer-based (no decimals). Useful when you want only whole numbers.

7. **decimal**
   - Example: `discount`
   - For precise numeric values (e.g., monetary amounts or percentages).

8. **url**
   - Example: `productLink`
   - Storing a link to a product page or external resource.

9. **email**
   - Example: `contactEmail`
   - Requires valid email format, can also be `required`.

10. **date**
    - Example: `releaseDate`
    - A date-only field (e.g., `YYYY-MM-DD`).

11. **timestamp**
    - Example: `lastRestock`
    - Stores both date and time; can be used for record-keeping or auditing.

12. **boolean**
    - Example: `isActive`
    - True/false field, often used for toggling availability or visibility.

13. **password**
    - Example: `adminCode`
    - Typically hashed before storage; used for secure fields.

14. **select**
    - Example: `category`
    - `options` defines the allowed choices.  
    - With `required: true`, the user must pick one.

---

## Validation

- **`validation.required`**  
  - Makes the field mandatory. An error is thrown if the field is missing or empty during create/update operations.
- **`validation.min`**, **`validation.max`**  
  - Numeric fields can define `min`/`max` to constrain values.  
  - For string fields, `min`/`max` can refer to minimum/maximum length.
- **`options`** (for select fields)  
  - An array of allowed choices; the value must be one of these.

---

## Automatic CRUD Operations

Digesto can automatically generate **CRUD endpoints** for each entity defined in your YAML configuration. Here’s how they typically map to HTTP operations in a RESTful API (the exact routes may vary depending on your entities):

1. **Create** (HTTP `POST`)  
   - **Endpoint**: `/api/collections/catalog_items`  
   - **Behavior**: Accepts a JSON payload with fields matching your columns. Validates the input against rules (e.g., `required`, `min`). If valid, a new record is inserted into `catalog_items`.

2. **Read** (HTTP `GET`)  
   - **Endpoint** (all items): `/api/collections/catalog_items`  
   - **Endpoint** (one item): `/api/collections/catalog_items/:id`  
   - **Behavior**: Returns one or more records from `catalog_items`. For a single item, you provide the `id` in the URL. Digesto applies any query filters, pagination, or validations as configured.

3. **Update** (HTTP `PUT` or `PATCH`)  
   - **Endpoint**: `/api/collections/catalog_items/:id`  
   - **Behavior**: Accepts an updated JSON payload for the item with the given `id`. Validates fields according to the YAML rules, and if valid, updates the record in `catalog_items`.

4. **Delete** (HTTP `DELETE`)  
   - **Endpoint**: `/api/collections/catalog_items/:id`  
   - **Behavior**: Deletes the record matching the provided `id` from `catalog_items`.

With each operation, Digesto enforces the constraints you've defined in the YAML. Fields like `name` (required: true) must be present, and numeric fields like `price` or `discount` are validated for the correct range or value.

---

## Workflow with Digesto

1. **YAML Parsing**  
   - Digesto reads this `.yml` file and constructs a database schema named `catalog_items` for `CatalogItem`.
2. **Entity & Validation Generation**  
   - Columns like `id` become a primary key that auto-increments.  
   - Fields like `name`, `description`, and `category` follow your `required` rules.
3. **Automatic CRUD**  
   - Each table gets REST endpoints for creating, reading, updating, and deleting records. Validation errors or missing fields result in appropriate error responses.

---

## Conclusion

By declaring an entity like `CatalogItem` in your **YAML** configuration, you gain:

- **Consistent Schema**: The structure of your table (`catalog_items`) is clearly documented and enforced.
- **Built-In Validations**: Each field type and validation rule is automatically applied.
- **Auto-Generated CRUD**: Digesto can create standard RESTful endpoints for your entity, reducing boilerplate code and letting you focus on higher-level logic.
- **Easy Maintenance**: Add or remove fields in the YAML, and Digesto will keep your schema, validations, and endpoints in sync.

This **real-life example** demonstrates how to define typical fields for a store or inventory management scenario, complete with automatic CRUD operations. Feel free to adapt or expand it to suit your application’s needs.
