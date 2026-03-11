# Pacific Islands API

This API was created as part of a CSE 341 project assignment. The purpose of the project is to practice building a Node.js application that connects to MongoDB and provides API endpoints for managing Pacific Island cultural information.

The API allows users to perform CRUD operations on islands and their associated traditions.

The project also demonstrates:

- Creating a Node.js / Express project
- Connecting to a MongoDB database
- Building REST API routes
- Implementing CRUD operations
- Using Swagger for API documentation
- Adding validation and error handling
- Implementing OAuth authentication
- Creating GraphQL queries and mutations

## Instructions to run application

- Run ```npm install``` in the terminal
- ```npm start```
- The API will run on: http://localhost:3000/
- Swagger Documentation should be available at: http://localhost:3000/api-docs

## Environment Setup
Before running the application, create a .env file and include your MongoDB credentials:

```MONGODB_URI=your_mongodb_connection_string```

Example:

```MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pacificislands```

## Things to look out for

- Explore the API using Swagger UI
- Test routes such as:
```
GET /islands
GET /traditions
POST /traditions
PUT /traditions/{id}
```

## Technologies used
- Node.js
- Express
- MongoDB
- Mongoose
- Swagger (OpenAPI)
- OAuth
- GraphQL
