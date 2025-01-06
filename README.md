# Digesto (WIP)

**Digesto** is an experimental Node.js/TypeScript library designed to help frontend developers quickly spin up a dynamic backend with minimal configuration. By defining your database entities, validations, and schema in a simple **YAML** file, Digesto will automatically generate and serve RESTful endpoints under the hood.

> **Note**: This project is **in progress**. Features may change or break without warning until it reaches a stable release.

---

## Features

1. **Instant Backend** 
- Supply a YAML file describing your data model, then run a single CLI command. No need to manually code a server or manage database connections. 

2. **Auto-Generated CRUD** 
- Out of the box, Digesto creates routes for listing, creating, reading, updating, and deleting records for each entity you define—so you can focus on your UI. 

3. **Simple Validation** 
- Specify validation rules (like `min`, `max`, or `required`) directly in the YAML. Digesto applies them at runtime, preventing invalid data from being stored. 

4. **Single Command to Launch** 
- Run `npx digesto` (or a custom script) in your React/Vue/Angular project, and a Node.js server automatically starts—no separate server code needed. 

5. **Config-Driven** 
- No complicated server config files. Keep everything in a human-readable `.yml` format, which is easy to update or share with your team. 

6. **Future-Ready** 
- The core architecture is designed to accommodate future features like relationships, authentication, and policy-based permissions—so as your app grows, Digesto can grow with it.
---

## Requirements

-  **Node.js** 16+
- A **PostgreSQL** database (currently the default in this project, but potentially extensible)
-  **npm** or **yarn** to install and run the CLI

---

## Installation

Because this library is still a work in progress, you may want to test it locally:

1.  **Install** it in your frontend project (React, Vue, etc.):

```bash
npm install digesto
# or
yarn add digesto
```

2.  **Set environment variables** (if needed) for database credentials, etc.:

```bash
export  DB_HOST=localhost
export  DB_USER=postgres
export  DB_PASSWORD=secret
# or use a .env + dotenv
```

3.  **Run** the CLI:

```bash
npx digesto
```

This starts the backend server using the YAML config located at `backend/api.yml` (by default). You can customize the location if needed.

---

## Quick Example

Here’s an example **`backend/api.yml`** file:

```yaml
name: My pet app
tables:
	Cat:
		tableName: cats
		properties:
			id:
				type: int
				primary: true
				generated: true
			name:
				type: varchar
			age:
				type: number
				validation:
					min: 3
	User:
		properties:
			name:
				type: varchar

```

  

When you run `npx digesto`:
- A connection to your database is established via TypeORM.
- The `Cat` and `User` entities are created dynamically.
- A CRUD API is exposed at `/api/collections/Cat`, `/api/collections/Cat/:id`, etc.

---

## Current Status & Roadmap

-  **Basic CRUD** generation from YAML definitions **(done)**
-  **Validation** (minimal numeric and string checks) **(done)**
-  **Relationships** (in progress)
-  **Policy-based permissions** (planned)
-  **Better CLI configuration** (planned)
-  **Production readiness** (not yet guaranteed)

---

## Contributing

Contributions are welcome! To propose changes or add features:

1.  **Clone** this repository.
2.  **Install** dependencies:

```bash
npm install
# or
yarn
```

3.  **Develop** your changes, then open a pull request with an explanation of your improvements or bug fixes.

---

## License

[MIT](./LICENSE)

---

**Disclaimer**: This library is still an **early-stage project**. Breaking changes are likely until a stable version is released. Use at your own discretion, and feel free to share your feedback for future improvements!