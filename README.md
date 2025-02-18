# Fundoo Notes Backend


## Authentication
For endpoints that require authentication, include the `Authorization` header with the `Bearer token` you receive upon logging in.

---

## Endpoints

### User Endpoints

#### 1. **Get all users**
- **Method:** `GET`
- **URL:** `/users`
- **Description:** Fetches all users.
- **Security:** Bearer authentication required.
- **Parameters:**
  - `Authorization` (Header) - Bearer token (required)
- **Responses:**
  - `200 OK`: Successfully fetched all users.
  - `500 Internal Server Error`: If an error occurs on the server.

#### 2. **Register a new user**
- **Method:** `POST`
- **URL:** `/users`
- **Description:** Creates a new user.
- **Parameters (Body):**
  - `name` (string) - User's full name
  - `email` (string) - User's email
  - `phone` (string) - User's phone number
  - `password` (string) - User's password
- **Responses:**
  - `201 Created`: User created successfully.
  - `400 Bad Request`: Invalid input.
  - `500 Internal Server Error`: If an error occurs on the server.

#### 3. **Login user**
- **Method:** `POST`
- **URL:** `/users/login`
- **Description:** Logs in a user and returns a token.
- **Parameters (Body):**
  - `email` (string) - User's email
  - `password` (string) - User's password
- **Responses:**
  - `200 OK`: Login successful, returns token.
  - `400 Bad Request`: Invalid input.
  - `401 Unauthorized`: Incorrect password.
  - `404 Not Found`: User not found.
  - `500 Internal Server Error`: If an error occurs on the server.

#### 4. **Forget password**
- **Method:** `POST`
- **URL:** `/users/forgetPassword`
- **Description:** Generates an OTP for password reset.
- **Parameters (Body):**
  - `email` (string) - User's email
- **Responses:**
  - `200 OK`: OTP generated successfully.
  - `500 Internal Server Error`: If an error occurs on the server.

#### 5. **Reset password**
- **Method:** `PUT`
- **URL:** `/users/resetPassword`
- **Description:** Resets the user's password.
- **Parameters (Body):**
  - `email` (string) - User's email
  - `otp` (number) - OTP for password reset
  - `newPassword` (string) - New password
- **Responses:**
  - `200 OK`: Password updated successfully.
  - `400 Bad Request`: Invalid OTP.
  - `500 Internal Server Error`: If an error occurs on the server.

---

### Notes Endpoints

#### 1. **Get all notes**
- **Method:** `GET`
- **URL:** `/notes`
- **Description:** Fetches all notes for the authenticated user.
- **Security:** Bearer authentication required.
- **Parameters:**
  - `Authorization` (Header) - Bearer token (required)
- **Responses:**
  - `200 OK`: Successfully fetched all notes.
  - `500 Internal Server Error`: If an error occurs on the server.

#### 2. **Create a new note**
- **Method:** `POST`
- **URL:** `/notes`
- **Description:** Creates a new note for the authenticated user.
- **Security:** Bearer authentication required.
- **Parameters (Body):**
  - `title` (string) - Title of the note
  - `description` (string) - Description of the note
  - `isTrash` (boolean) - Whether the note is in the trash
  - `userId` (string) - ID of the user creating the note
- **Responses:**
  - `201 Created`: Note created successfully.
  - `400 Bad Request`: Invalid input.
  - `500 Internal Server Error`: If an error occurs on the server.

#### 3. **Update a note**
- **Method:** `PUT`
- **URL:** `/notes/updateNote/{_id}`
- **Description:** Updates an existing note for the authenticated user.
- **Security:** Bearer authentication required.
- **Parameters:**
  - `Authorization` (Header) - Bearer token (required)
  - `_id` (Path) - Note ID (required)
  - `title` (string) - New title of the note
  - `description` (string) - New description of the note
- **Responses:**
  - `200 OK`: Note updated successfully.
  - `400 Bad Request`: Invalid input.
  - `404 Not Found`: Note not found.
  - `500 Internal Server Error`: If an error occurs on the server.

#### 4. **Delete a note**
- **Method:** `DELETE`
- **URL:** `/notes/deleteNote/{_id}`
- **Description:** Deletes an existing note for the authenticated user.
- **Security:** Bearer authentication required.
- **Parameters:**
  - `Authorization` (Header) - Bearer token (required)
  - `_id` (Path) - Note ID (required)
- **Responses:**
  - `200 OK`: Note deleted successfully.
  - `404 Not Found`: Note not found.
  - `500 Internal Server Error`: If an error occurs on the server.

---

## Definitions

### User Object
- **name** (string): User's full name
- **email** (string): User's email address
- **phone** (string): User's phone number
- **password** (string): User's password

### Note Object
- **title** (string): Title of the note
- **description** (string): Description of the note
- **userId** (string): ID of the user who created the note
- **isTrash** (boolean): Indicates whether the note is in the trash

---

## Error Codes
- `400 Bad Request`: Invalid input data.
- `401 Unauthorized`: Authentication failed.
- `404 Not Found`: Resource not found.
- `500 Internal Server Error`: Server-side error.
