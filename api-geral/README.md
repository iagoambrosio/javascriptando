# Node.js Fastify API Example

This project is a template for building a RESTful API using Node.js, Fastify, Swagger UI, and Zod. It follows best practices for modular architecture, validation, and documentation.

## Features
- Fastify for high-performance HTTP server
- Zod for request/response validation
- Swagger UI for interactive API docs
- Modular structure: routes, controllers, services, schemas

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Access Swagger UI at [http://localhost:3000/docs](http://localhost:3000/docs)

## Project Structure
- `src/routes/` - Route definitions
- `src/controllers/` - Request handlers
- `src/services/` - Business logic
- `src/schemas/` - Zod schemas for validation
- `src/app.js` - Fastify app setup
- `src/server.js` - Server entry point

## Health Check
Test the API with:
```bash
curl http://localhost:3000/health
```

## License
MIT
