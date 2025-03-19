# spinwise-be

A RESTful API backend built with Nest.js to support users management.

## Features

- **RESTful API**: Clean API design following REST principles
- **Data Persistence**: SQLite database for quick development and testing
- **Server-side Operations**: Efficient implementation of pagination, sorting, and searching
- **Type Safety**: Fully typed with TypeScript
- **Automated Migrations**: Database schema and seed data managed through TypeORM migrations
- **Unit Tests**: Basic test coverage for core functionality

## Setup

```bash
# install dependencies
$ npm i

# development
$ npm run start

# watch mode
$ npm run start:dev

# unit tests
$ npm run test
```

Project is generated using Nest.js CLI

## Architecture

The application follows Nest.js best practices with a modular architecture:
- **Controllers**: Handle HTTP requests and define API endpoints
- **Services**: Implement business logic and data operations
- **Entities**: Define data models
- **DTOs**: Ensure type safety for data transfer
- **Repositories**: Manage database interactions

## Tech Stack

- **Framework**: Nest.js
- **Database**: SQLite
- **ORM**: TypeORM
- **Testing**: Jest

## API Endpoints

The API provides endpoints for user management:

- `GET /users`: Fetch users with support for:
  - Pagination (`page` and `limit` parameters)
  - Sorting (`sortBy` and `sortOrder` parameters)
  - Searching (`search` parameter for name, surname, and email)
- Additional CRUD endpoints for user management

## Project Structure

```
├── src/
│   ├── users/
│   │   ├── dto/                # Data Transfer Objects
│   │   ├── entities/           # User entity definitions
│   │   ├── users.controller.ts # API endpoints
│   │   ├── users.service.ts    # Business logic
│   │   └── users.module.ts     # Module definition
│   ├── database/
│   │   └── migrations/         # TypeORM migrations
│   ├── app.module.ts           # Main application module
│   └── main.ts                 # Application entry point
└── test/                       # Test files
```

## Database

- Uses SQLite for simplicity and ease of setup
- Database migrations are handled by TypeORM
- Migrations run automatically (`migrationRuns: true`) to populate initial data

## Comments

- Kept implementation simple to focus on core functionality
- SQLite database is used as a quick solution for storage
- Migrations are generated using TypeORM CLI
- Implemented server-side pagination, sorting, and searching to support the frontend data table
- Basic test coverage is included