# Digesto (WIP)

**Digesto** is an experimental Node.js/TypeScript library designed to help frontend developers quickly spin up a dynamic backend with minimal configuration. By defining your database entities, validations, and schema in a simple **YAML** file, Digesto will automatically generate and serve RESTful endpoints under the hood.

> **Note**: This project is **in progress**. Features may change or break without warning until it reaches a stable release.

---

## Features

1. **Instant backend** 
Supply a YAML file describing your data model, then run a single CLI command. No need to manually code a server or manage database connections. 

2. **Auto-generated CRUD** 
Out of the box, Digesto creates routes for listing, creating, reading, updating, and deleting records for each entity you define—so you can focus on your UI. 

3. **Simple validation** 
Specify validation rules (like `min`, `max`, or `required`) directly in the YAML. Digesto applies them at runtime, preventing invalid data from being stored. 

4. **Single command to launch** 
Run `npx digesto` (or a custom script) in your React/Vue/Angular project, and a Node.js server automatically starts—no separate server code needed. 

5. **Config-driven** 
No complicated server config files. Keep everything in a human-readable `.yml` format, which is easy to update or share with your team. 

6. **Future ready** 
The core architecture is designed to accommodate future features like relationships, authentication, and policy-based permissions—so as your app grows, Digesto can grow with it.

---

## Requirements

-  **Node.js** 16+
- A **PostgreSQL** database (currently the default in this project, but potentially extensible)
-  **npm**, **yarn** or **pnpm** to install and run the CLI

---

## Installation

Digesto is still a work in progress. If you'd like to experiment with it in your project, follow the steps below:

1. **Install the library**

This library is framework agnostic, so you can use it anywhere (React, Vue, Angular, Go, Rust, or just as a RESTful API).

```bash
npm install digesto 
# or 
npx digesto
```
2. Configure environment variables

Set the variables for the database connections and other settings. Create a `.env` file in the root of your project (the same folder as `package.json`). For example:

```bash
DIGESTO_DATABASE_HOST="localhost"
DIGESTO_DATABASE_PORT="5432"
DIGESTO_DATABASE_USERNAME="username"
DIGESTO_DATABASE_PASSWORD="password"
DIGESTO_DATABASE_NAME="test"
DIGESTO_SERVER_PORT=3000
```

3. Create your YAML configuration

By default, Digesto looks for a file at `backend/api.yml`. Create a backend folder in your project’s root (next to `package.json`) and add an `api.yml` file. For example:

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
# more config...
```

[Here](./packages/docs/example-1.md) you have a real-life use case example.

4. Run the CLI

Use the Digesto CLI to start the backend server:

```bash
npx digesto
```

This will spin up the server using the YAML configuration at `backend/api.yml`.

With these steps, Digesto should be up and running in your project. Since it’s still in development, breaking changes or unexpected behavior may occur.

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
- A CRUD API is exposed at `/api/collections/:tableName`, `/api/collections/:tableName/:id`, etc. For example:
	- `/api/collections/cats`
	- `/api/collections/cats/23`

---

## Current Status & Roadmap

- **Validations** (planned)
- **Relationships between models** (planned)
- **CLI enhancements** (planned)
- **Database migrations** (planned)
- **Policy-based permissions** (planned)
- **Authentication module** (planned)
- **Admin UI** (planned)

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