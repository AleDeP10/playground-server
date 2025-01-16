# Playground Server

 The goal of the Playground projects is to create a demonstration application using React and a Node.js backend. This aims to provide a minimal example of how the involved technologies work. The implementation follows an incremental development approach, allowing for the integration of new software tools over time. This fosters a deeper understanding before their deployment in more  complex projects.

 The scenario considered is a classic TodoList, which involves a list of tasks saved in a Postgres database, accompanied by a table of users authorized to interact with it.

 The project exposes unauthenticated endpoints for the home API, which are useful for checking whether the server is operating and if the database is reachable. It also includes endpoints related to todo, which allow logged-in users to interact with the data. 

 See [Playground Frontend](https://github.com/AleDeP10/playground-frontend) to explore the features provided by the application.

## Supported Endpoints

### Test APIs (No Authentication Required)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**1. Hello**

**Endpoint**: `/hello`  
**Method**: `GET`  
**Description**: Returns a greeting message. If a name is provided as a query parameter, it customizes the greeting with the given name.

**Request Parameters**:
- `name` (optional): The name to include in the greeting.

**Response**:
- `200 OK`: A JSON object containing the greeting message.
  ```json
  {
    "result": "Hello, World!"
  }

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2. Fetch Data**

**Endpoint**: `/fetchData`  
**Method**: `GET`  
**Description**: Returns test data, including a counter that increments with each request.

**Response**:
- `200 OK`: A JSON object containing the status, description, and current counter value.
  ```json
  {
    "status": "OK",
    "description": "test data",
    "counter": 1
  }

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**3. Database Scan (dbScan)**

**Endpoint**: `/dbScan`  
**Method**: `GET`  
**Middleware**: `addDbToReq`  
**Description**: Executes a SQL query and returns the result. The query and alias can be customized through query parameters.

**Request Parameters**:
- `query` (optional): The SQL query to execute. Defaults to `SELECT 1`.
- `alias` (optional): The alias for the query result. Defaults to `result`.

**Response**:
- `200 OK`: A JSON object containing the query result.
  ```json
  {
    "result": 1
  }
  ```

### Login Endpoint

**Endpoint**: `/login`  
**Method**: `POST`  
**Description**: Authenticates a user and returns a token if the credentials are valid.

**Request Body**:
- `username`: The username of the user.
- `password`: The password of the user.

**Response**:
- `200 OK`: A JSON object containing the authentication token and username.
  ```json
  {
    "token": "your-authentication-token",
    "username": "john_doe"
  }

- `401 Unauthorized`: If the credentials are invalid.
  ```json
  {
    "error": "Invalid credentials"
  }
  ```
- `500 Internal Server Error`: If there is an error while processing the request.
  ```json
  {
    "error": "Internal Server Error"
  }
  ```

### TodoList Endpoints (Authenticated)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**1. Create Task**

**Endpoint**: `/create`  
**Method**: `POST`  
**Middleware**: `[addKnexToReq, authenticateTokenHttp]`  
**Description**: Creates a new task in the todo list.

**Request Body**:
- `task`: The description of the task.
- `status` (optional): The status of the task. Defaults to `TODO`.

**Response**:
- `201 Created`: A JSON object containing the ID of the newly created task.
  ```json
  {
    "id": 1
  }
  ```
- `500 Internal Server Error`: If there is an error during task creation.
  ```json
  {
    "error": "Error in task creation"
  }
  ```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**2. Search Tasks**

**Endpoint**: `/search`  
**Method**: `POST`  
**Middleware**: `[addKnexToReq, authenticateTokenHttp]`  
**Description**: Finds all the tasks into the table. In current implementation, filters will be applied by frontend after the caching of results.

**Response**:
- `200 OK`: A JSON array containing the tasks that match the search criteria.
  ```json
  [
    {
      "id": 1,
      "task": "Finish the project",
      "status": "TODO"
    },
    {
      "id": 2,
      "task": "Review the code",
      "status": "IN PROGRESS"
    }
  ]
  ```
- `500 Internal Server Error`: If there is an error during task search.
  ```json
  {
    "error": "Error in task search"
  }
  ```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**3. Update Task**

**Endpoint**: `/update`  
**Method**: `PUT`  
**Middleware**: `[addKnexToReq, authenticateTokenHttp]`  
**Description**: Updates an existing task in the todo list.

**Request Query**:
- `id`: The ID of the task to update.

**Request Body**:
- `task`: The updated description of the task.
- `status`: The updated status of the task.

**Response**:
- `200 OK`: If the task is successfully updated.
  ```json
  {
    "message": "Task updated successfully"
  }
  ```
- `404 Not Found`: If the task with the specified ID is not found.
  ```json
  {
    "error": "Task not found"
  }
  ```
- `500 Internal Server Error`: If there is an error during task update.
  ```json
  {
    "error": "Error in updating the task"
  }
  ```

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**4. Delete Task**

**Endpoint**: `/remove`  
**Method**: `DELETE`  
**Middleware**: `[addKnexToReq, authenticateTokenHttp]`  
**Description**: Deletes an existing task from the todo list.

**Request Query**:
- `id`: The ID of the task to delete.

**Response**:
- `200 OK`: If the task is successfully deleted.
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```
- `404 Not Found`: If the task with the specified ID is not found.
  ```json
  {
    "error": "Task not found"
  }
  ```
- `500 Internal Server Error`: If there is an error during task deletion.
  ```json
  {
    "error": "Error in deleting the task"
  }
  ```


## Involved Technologies 

### Knex

**Description**:
Knex.js is a SQL query builder for Node.js, designed to be flexible and fun to use. It supports both callbacks and promises and is compatible with various databases, including PostgreSQL, MySQL, SQLite3, and Oracle.

**Usage Example**:
```javascript
let query = req
  .db("Task AS ts")
  .select("ts.id", "ts.task", "ts.status")
  .from("Task AS ts");
query = query.orderBy("ts.id", "asc");
const results = await query;
```
In this example, `Knex` is used to construct a query that selects task details from the `Task` table and orders them by their ID.

### jsonwebtoken

**Description**:
`jsonwebtoken` is a library to work with JSON Web Tokens (JWT). It is commonly used for authentication purposes, allowing you to securely transmit information between parties as a JSON object. It is compact, self-contained, and supports both public and private key pair algorithms.

**Usage Example**:
```javascript
jwt.verify(token, SECRET_KEY, (err, user) => {
  if (err) return res.sendStatus(403);
  req.userId = user.userId;
  next();
});
```
In this example, `jsonwebtoken` is used to verify a token. If the token is valid, the user's ID is attached to the request object; otherwise, a 403 status is returned.

### dotenv

**Description**:
`dotenv` is a zero-dependency module that loads environment variables from a `.env` file into `process.env`. This is especially useful for keeping sensitive configurations like database credentials and secret keys out of your codebase.

**Example Configuration**:
```plaintext
DB_HOSTNAME=localhost
DB_PORT=5432
DB_DATABASE=playground
DB_USERNAME=<username>
DB_PASSWORD=<password>

JWT_SECRET=<secret_key>
PORT=5000
```
In this project, `dotenv` is used to load environment configurations required for connecting to the database and managing JWT authentication.


## Project Setup

Follow these steps to set up the project and get it running on your local machine.

### 1. Clone the repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/AleDeP10/playground-server.git
```

### 2. Install the database

The `schemas` folder contains the SQL file that describes the database structure and a complete backup of both the structure and data, allowing you to install it on your own computer.

Follow these steps to set up the database:

 - **Install PostgreSQL**:
   Ensure that PostgreSQL is installed on your machine.

 - **Create a database named `playground`**
   Open pgAdmin and create an empty database that will be targeted by the restore. 

 - **Set the PostgreSQL bin Directory in System Path**:
   Make sure the `bin` directory of PostgreSQL is included in your system's PATH. Alternatively, you can use the full path to the `pg_restore` executable in the following command.

 - **Navigate to the `schemas` Directory**:
   Open a terminal and change to the `schemas` directory.

 - **Execute the Restore Command**:
   Run the following command in your terminal.
   ```bash
   & pg_restore -U <username> -h localhost -d playground -v "playground.backup"
   ```

Replace `<username>` with your PostgreSQL username. Enter the password when required.

### 3. Install dependencies

Navigate back to the root directory of the project and install the required dependencies using npm:

```bash
npm install
```

### 4. Start the server

Start the server with the following command:

```bash
npm start
```

The server should now be running and accessible according to your configuration.

## Debugging

The project includes a debugger configuration in the `.vscode` directory, which allows for step-by-step execution and debugging in Visual Studio Code. To utilize this feature, open the project in Visual Studio Code, go to the Debug panel, and start the debugging session.

With these steps, you should be able to set up, run, and debug the project smoothly on your local machine.