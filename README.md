# School Management System API

## Overview
This project is a **School Management System API** built using the **MERN stack** (MongoDB, Express.js, Node.js). The API manages students, teachers, and classes, supports uploading profile images to **Cloudinary**, and provides **JWT-based authentication** with role-based access control.

## Features
- **Authentication**: Register and log in as a student, teacher, or class, with JWT-based authentication.
- **Role-Based Access Control**:
  - **Students**: Access `studentRoutes` only.
  - **Teachers**: Access `teacherRoutes` only.
  - **Classes**: Access `classRoutes` only.
- **Profile Image Upload**: Use `form-data` to upload student and teacher profile images to **Cloudinary**.
- CRUD operations for:
  - **Students** (create, read, update, delete).
  - **Teachers** (create, read, update, delete).
  - **Classes** (create, read, update, delete).

---

## Prerequisites
Ensure you have the following installed:
- **Node.js** (v14 or later)
- **npm** (Node Package Manager)
- **MongoDB** (running locally or on a cloud service like MongoDB Atlas)
- **Cloudinary** account

---

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/TheMarvelFan/school-management-system.git
cd school-management-system
```

### 2. Install Dependencies
Run the following command to install the required dependencies:
```bash
npm install
```

### 3. Configure Environment Variables
An env file is already present in the project. Make sure to adjust the MongoDB URI (and the port number of the project) if you are using a different port.

> Replace `MONGO_URI` with your MongoDB connection string, and add your **Cloudinary** credentials.

### 4. Start the Server
Run the server locally:
```bash
npm start
```

The server will start at [http://localhost:5000](http://localhost:5000) (or a port number specified by you). 

---

## Using the API Locally with Postman

### 1. Register a User
To use the API, you need to register as a **student**, **teacher**, or **class**.

**Endpoint**:  
`POST /api/auth/register`

**Body (JSON)**:
```json
{
  "role": "student", // or "teacher", or "class"
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "classId": "some-class-id", // Required for students
  "subject": "Math" // Required for teachers
}
```

### 2. Log in as a User
Log in to receive a JWT token.

**Endpoint**:  
`POST /api/auth/login`

**Body (JSON)**:
```json
{
  "role": "student", // or "teacher", or "class"
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response**:
```json
{
  "token": "your_jwt_token",
  "role": "student"
}
```

> **Important**: Copy the `token` from the response to use it for authenticated requests.

---

### 3. Set Up Authorization in Postman
For all authenticated requests:
1. Go to the **Authorization** tab in Postman.
2. Select **Bearer Token**.
3. Paste the token you received from the login response.

---

### 4. Access Routes Based on Role

#### **Student Routes**
| Method | Endpoint          | Description                        | Body Type      |
|--------|-------------------|------------------------------------|----------------|
| POST   | `/api/students`    | Add a new student                  | `form-data`    |
| GET    | `/api/students`    | Get all students                   | None           |
| GET    | `/api/students/:id`| Get a student by ID                | None           |
| PUT    | `/api/students/:id`| Update a student                   | `form-data`    |
| DELETE | `/api/students/:id`| Soft delete a student              | None           |

> **Note**: Use `form-data` to upload the `profileImage` field for creating or updating a student.

#### **Teacher Routes**
| Method | Endpoint          | Description                        | Body Type      |
|--------|-------------------|------------------------------------|----------------|
| POST   | `/api/teachers`    | Add a new teacher                  | `form-data`    |
| GET    | `/api/teachers`    | Get all teachers                   | None           |
| GET    | `/api/teachers/:id`| Get a teacher by ID                | None           |
| PUT    | `/api/teachers/:id`| Update a teacher                   | `form-data`    |
| DELETE | `/api/teachers/:id`| Soft delete a teacher              | None           |

> **Note**: Use `form-data` to upload the `profileImage` field for creating or updating a teacher.

#### **Class Routes**
| Method | Endpoint          | Description                        | Body Type      |
|--------|-------------------|------------------------------------|----------------|
| POST   | `/api/classes`     | Create a class                     | JSON           |
| GET    | `/api/classes`     | Get all classes                    | None           |
| GET    | `/api/classes/:id` | Get a class by ID                  | None           |
| PUT    | `/api/classes/:id` | Update a class                     | JSON           |
| DELETE | `/api/classes/:id` | Delete a class                     | None           |

---

### 5. Manage JWT Tokens
- After registering and logging in, you will receive a **JWT token** in the response.
- Use this token to authenticate all API requests by adding it to the `Authorization` header in the format:
  ```
  Authorization: Bearer <your_jwt_token>
  ```

### 6. Testing with Form-Data
For endpoints that require **file uploads**, set the body type in Postman to **form-data**:
1. Add the key `profileImage` (type: File).
2. Choose an image file to upload.
3. Add other fields like `name`, `email`, etc., as required.

---

## Project Folder Structure
```
school-management-system/
├── config/
│   ├── cloudinary.js          # Cloudinary configuration
│   ├── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js      # Authentication logic
│   ├── studentController.js   # Student CRUD logic
│   ├── teacherController.js   # Teacher CRUD logic
│   ├── classController.js     # Class CRUD logic
├── middlewares/
│   ├── authMiddleware.js      # JWT and role-based middleware
│   ├── errorHandler.js        # Error-handling middleware
├── models/
│   ├── Student.js             # Student schema
│   ├── Teacher.js             # Teacher schema
│   ├── Class.js               # Class schema
├── routes/
│   ├── authRoutes.js          # Routes for authentication
│   ├── studentRoutes.js       # Routes for students
│   ├── teacherRoutes.js       # Routes for teachers
│   ├── classRoutes.js         # Routes for classes
├── .env                       # Environment variables
├── app.js                     # Entry point for the application
├── package.json               # Dependencies and scripts
```

---

## Additional Notes
- **Error Handling**: Common errors such as invalid data, duplicate entries, and unauthorized access are handled.
- **Soft Deletes**: Deleted students and teachers are marked as inactive rather than removed from the database.

---

## Conclusion
This project provides a fully functional backend for managing a school system, supporting authentication, file uploads, and role-based access control. Use tools like Postman to test and interact with the API. For further enhancements, consider adding features like **attendance tracking** and **exam results management**.
