# Product API

A simple RESTful API built with Node.js and Express.js to manage a collection of products stored in an in-memory database. This project serves as a starter Express server for a Week 2 assignment, demonstrating CRUD operations, middleware implementation, and basic error handling.

## Features

- **CRUD Operations**: Create, Read, Update, and Delete products.
- **Middleware**:
  - Request logging for tracking HTTP requests.
  - API key authentication for securing endpoints.
  - Product validation for POST and PUT requests.
  - Custom error handling for robust error responses.
- **In-Memory Database**: Stores product data in a simple array for demonstration purposes.
- **RESTful API**: Follows REST principles for endpoint design.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building the API.
- **Body-Parser**: Middleware to parse JSON request bodies.
- **UUID**: Library for generating unique IDs (not fully utilized in this version).
- **JavaScript (ES6)**: Core programming language.

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>

## Install dependencies:

Ensure you have Node.js installed, then run:

  ```bash  
  npm install
This installs the required packages: express, body-parser, and uuid.

## Start the server:

  ```bash
  node server.js
The server will run on http://localhost:3000 (or the port specified in PORT).

## Usage

  **Access the root endpoint (/) to see a welcome message:**
      Welcome to the Product API! Go to /api/products to see all products.
    Use tools like Postman, cURL, or a browser to interact with the API endpoints.
## API Endpoints
  **The API provides the following endpoints for managing products:**

## API Endpoints
The API provides the following endpoints for managing products:

  | Method | Endpoint                | Description                              | Request Body                              |
  |--------|-------------------------|------------------------------------------|------------------------------------------|
  | GET    | `/`                     | Returns a welcome message                | None                                     |
  | GET    | `/api/products`         | Retrieves all products                   | None                                     |
  | GET    | `/api/products/:id`     | Retrieves a product by ID                | None                                     |
  | POST   | `/api/products`         | Creates a new product                    | `{ id, name, description, price, category, inStock }` |
  | PUT    | `/api/products/:id`     | Updates an existing product              | `{ id, name, description, price, category, inStock }` |
  | DELETE | `/api/products/:id`     | Deletes a product by ID                  | None                                     |

### Request Body Format (for POST and PUT)
```json
{
  "id": 1,
  "name": "Product Name",
  "description": "Detailed description of the product",
  "price": 99.99,
  "category": "Category Name",
  "inStock": true
}

## Validation Rules (for POST and PUT)
   **id**: Must be an integer.
   **name**: Must be a string, at least 3 characters long.
   **description**: Must be a string, at least 10 characters long.
   **price**: Must be a positive number.
   **inStock**: Must be a boolean.

## Response Status Codes200 OK: Successful GET or PUT request.
  **201 Created**: Successful POST request.
  **204 No Content**: Successful DELETE request.
  **400 Bad Request**: Invalid request body (validation errors).
  **401 Unauthorized**: Missing or invalid API key.
  **404 Not Found**: Product not found for the given ID.
  **500 Internal Server Error**: Server-side error.

## Middleware
The API uses custom middleware for enhanced functionality:

**Request Logger (requestLogger)**:

  Logs the timestamp, HTTP method, and URL of every incoming request to the console.
  Example log: 2025-10-23T07:54:00.000Z - GET /api/products

**Authentication (authMiddleware)**:

  Requires an x-api-key header in all requests.
  Validates the API key against the API_KEY environment variable.
  Returns a 401 Unauthorized response if the key is missing or invalid.

**Product Validation (validateProduct)**:

  Applied to POST and PUT requests.
  Ensures the request body meets validation rules (see Validation Rules).
  Returns a 400 Bad Request response with error details if validation fails.

**Error Handler (errorHandler)**:

  Catches and logs server-side errors.
  Returns a 500 Internal Server Error response with a generic error message.




  


