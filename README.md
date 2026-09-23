# Vetly Company Backend API Documentation

This repository exposes a small Express + MongoDB API for user authentication and pet management. The documentation below reflects the actual routes and controllers present in the codebase.

## Base URL

- Local development: `http://localhost:1234`
- If your environment uses another port, update the value in your `PORT` environment variable.

## Environment Variables

Create a `.env` file in the project root with the following values:

```env
PORT=1234
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
ADMIN_EMAIL=admin@example.com
ADMIN_PASS=admin123
ADMIN_NAME=Admin
```

## Authentication

Most protected routes require a JWT token.

In Postman:

1. Log in using the `/api/users/login` route.
2. Copy the returned token.
3. Add the header:

```http
Authorization: Bearer <your_token>
```

The auth middleware verifies the token and attaches the decoded user to `req.user`.

---

## API Endpoints

### 1) Health Check

#### GET `/`

Checks whether the server is running.

Example request:

```http
GET http://localhost:1234/
```

Example response:

```json
"health"
```

---

### 2) User Signup

#### POST `/api/users/signup`

Creates a new user account.

Request body:

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "123456"
}
```

Validation rules from the controller:

- `username` is required
- `email` is required and must contain `@`
- `password` is required
- Duplicate email or username is rejected

Example response:

```json
{
  "_id": "64f1b8e72a0d9d1a5d5f1d2f",
  "username": "john",
  "email": "john@example.com",
  "password": "$2b$10$...hashed...",
  "role": "USER",
  "createdAt": "2026-09-23T00:00:00.000Z",
  "updatedAt": "2026-09-23T00:00:00.000Z"
}
```

Possible status codes:

- `201` Created
- `400` Bad request
- `409` User already exists

---

### 3) User Login

#### POST `/api/users/login`

Logs in an existing user and returns a JWT token.

Request body:

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Example response:

```json
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

Possible status codes:

- `200` Success
- `400` Missing email/password
- `404` User not found
- `500` Internal server error

---

### 4) Verify Authenticated User

#### GET `/api/users/auth`

Returns the authenticated user payload from the decoded JWT.

Headers:

```http
Authorization: Bearer <token>
```

Example response:

```json
{
  "message": "Authenticate successful",
  "user": {
    "id": "64f1b8e72a0d9d1a5d5f1d2f",
    "email": "john@example.com"
  }
}
```

Possible status codes:

- `200` Authorized
- `401` Invalid or missing token

---

### 5) Get All Pets (User Route)

#### GET `/api/users/all`

This route is defined under the user router, and it currently uses the pet controller to return all pet records.

Example request:

```http
GET http://localhost:1234/api/users/all
```

Example response:

```json
[
  {
    "_id": "64f1b8e72a0d9d1a5d5f1d2f",
    "breed": "Siamese",
    "Age": "2",
    "cost": "2500",
    "picture": "https://example.com/siamese.jpg",
    "quantity": 5,
    "createdAt": "2026-09-23T00:00:00.000Z",
    "updatedAt": "2026-09-23T00:00:00.000Z"
  }
]
```

Possible status codes:

- `200` Success
- `500` Failed to retrieve pets

> Note: This route does not currently include authentication in the code, even though the pet routes do.

---

### 6) Get All Pets

#### GET `/api/pets/all`

Returns the full list of pets in the database.

Headers:

```http
Authorization: Bearer <token>
```

Example request:

```http
GET http://localhost:1234/api/pets/all
```

Example response:

```json
[
  {
    "_id": "64f1b8e72a0d9d1a5d5f1d2f",
    "breed": "Siamese",
    "Age": "2",
    "cost": "2500",
    "picture": "https://example.com/siamese.jpg",
    "quantity": 5
  }
]
```

Possible status codes:

- `200` Success
- `401` Unauthorized
- `500` Error fetching pets

---

### 7) Create Pet

#### POST `/api/pets/create`

Creates a new pet record.

Headers:

```http
Authorization: Bearer <token>
```

Request format:

- `multipart/form-data` is expected because the route uses `upload.single("picture")`
- The file field name is `picture`

Example form-data body:

| Key | Value |
| --- | --- |
| breed | Siamese |
| age | 2 |
| cost | 2500 |
| picture | file upload or image URL string |

Example JSON alternative (if your implementation sends strings instead of a file):

```json
{
  "breed": "Siamese",
  "age": "2",
  "cost": "2500",
  "picture": "https://example.com/siamese.jpg"
}
```

Example response:

```json
{
  "_id": "64f1b8e72a0d9d1a5d5f1d2f",
  "breed": "Siamese",
  "age": "2",
  "cost": "2500",
  "picture": "https://example.com/siamese.jpg",
  "quantity": 0
}
```

Possible status codes:

- `201` Created
- `400` Missing required fields
- `401` Unauthorized
- `409` Pet already exists

---

### 8) Update Pet

#### PUT `/api/pets/update/:id`

Updates an existing pet.

Headers:

```http
Authorization: Bearer <token>
```

URL example:

```http
PUT http://localhost:1234/api/pets/update/64f1b8e72a0d9d1a5d5f1d2f
```

Request body example:

```json
{
  "breed": "Persian",
  "age": "3",
  "cost": "3200",
  "picture": "https://example.com/persian.jpg",
  "quantity": 4
}
```

Example response:

```json
{
  "message": "pet updated successfully",
  "data": {
    "_id": "64f1b8e72a0d9d1a5d5f1d2f",
    "breed": "Persian",
    "age": "3",
    "cost": "3200",
    "picture": "https://example.com/persian.jpg",
    "quantity": 4
  }
}
```

Possible status codes:

- `200` Success
- `401` Unauthorized
- `404` Pet not found
- `500` Error updating pet

---

### 9) Delete Pet

#### DELETE `/api/pets/delete`

Deletes a pet record.

Headers:

```http
Authorization: Bearer <token>
```

Important note:

- The route is defined as `/api/pets/delete`
- The controller tries to read `req.params.id`
- This means the current implementation is inconsistent and may need to be updated to use a route like `/api/pets/delete/:id`

Example request pattern:

```http
DELETE http://localhost:1234/api/pets/delete/64f1b8e72a0d9d1a5d5f1d2f
```

Example response:

```json
"Pet deleted successfully"
```

Possible status codes:

- `200` Deleted
- `401` Unauthorized
- `403` Admin access required
- `404` Pet not found
- `500` Error deleting pet

> This route requires both authentication and admin-level access via `authenticateAdmin`.

---

### 10) Buy Pet

#### POST `/api/pets/buy`

Purchases one pet by breed.

Headers:

```http
Authorization: Bearer <token>
```

Request body:

```json
{
  "breed": "Siamese"
}
```

Example response:

```json
{
  "message": "Pet purchased successfully",
  "data": {
    "_id": "64f1b8e72a0d9d1a5d5f1d2f",
    "breed": "Siamese",
    "Age": "2",
    "cost": "2500",
    "picture": "https://example.com/siamese.jpg",
    "quantity": 4
  }
}
```

Possible status codes:

- `200` Purchase successful
- `400` Missing breed or out of stock
- `401` Unauthorized
- `404` Pet not found
- `500` Error purchasing pet

---

## Postman Setup Suggestions

### Recommended environment variables

Create a Postman environment named `Vetly Local` with these variables:

```text
baseUrl = http://localhost:1234
token = <paste login token here>
```

Then set the authorization header in Postman as:

```http
Authorization: Bearer {{token}}
```

---

## Notes on Current Code Behavior

This API works as written, but some parts of the implementation contain mismatches that are worth knowing:

- `pet.model.js` uses `Age` with a capital `A`, while the controller reads `age`
- `buyPet` looks for `breedName`, while the request body sends `breed`
- `deletePet` reads `req.params.id`, but the defined route does not include an id parameter
- `user.routes.js` exposes `GET /api/users/all`, but this route actually loads pets through the pet controller

These are implementation details in the current code, and they may need to be cleaned up for production use.

---

## Quick Test Flow in Postman

1. `POST /api/users/signup`
2. `POST /api/users/login`
3. Copy the token
4. Set `Authorization: Bearer <token>`
5. Call:
   - `GET /api/pets/all`
   - `POST /api/pets/create`
   - `PUT /api/pets/update/:id`
   - `POST /api/pets/buy`
   - `DELETE /api/pets/delete/:id` (after aligning the route/controller mismatch)

---

## Summary

This backend currently supports:

- User signup and login
- JWT authentication
- Pet listing
- Pet creation
- Pet update
- Pet purchase
- Admin-only pet deletion

If you want, this README can also be expanded into a fully branded API documentation page with a table of all routes, sample curl commands, and a Postman collection export section

Author: Oluwarotimi