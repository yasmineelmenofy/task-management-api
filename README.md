# 🚀 Task Management API

A **RESTful Task Management API** built with Node.js, Express, TypeScript, MongoDB, and Zod, following **clean architecture principles** and production-level practices.

---

## 📌 Overview

This project demonstrates how to design a **scalable backend system** with:

* Clear separation of concerns
* Secure authentication
* Input validation
* Centralized error handling

The API allows users to:

* Register and authenticate
* Manage tasks (CRUD operations)

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js (v5)

### Language

* TypeScript

### Database

* MongoDB

### ODM

* Mongoose

### Validation

* Zod

### Authentication

* JWT (JSON Web Tokens)

### Security & Middleware

* Helmet
* Morgan
* Express Rate Limit

---

## 📂 Project Structure

```
src
│
├── config
│   └── db.ts
│
├── models
│   ├── task.model.ts
│   └── user.model.ts
│
├── controllers
│   ├── task.controller.ts
│   └── auth.controller.ts
│
├── services
│   ├── task.service.ts
│   └── auth.service.ts
│
├── routes
│   ├── task.routes.ts
│   └── auth.routes.ts
│
├── middleware
│   ├── validate.middleware.ts
│   ├── error.middleware.ts
│   └── auth.middleware.ts
│
├── schemas
│   ├── task.schema.ts
│   └── auth.schema.ts
│
├── utils
│   ├── apiError.ts
│   ├── asyncHandler.ts
│   └── generateToken.ts
│
└── index.ts
```

---

## ⚙️ Features

* ✅ RESTful API design
* ✅ Layered architecture (Controller → Service → Model)
* ✅ JWT Authentication (Register & Login)
* ✅ Global error handling middleware
* ✅ Async handler pattern (no try/catch in controllers)
* ✅ Request validation using Zod
* ✅ MongoDB integration with Mongoose
* ✅ Rate limiting for API protection
* ✅ Security headers with Helmet
* ✅ Request logging with Morgan

---

## 📡 API Endpoints

### 🔐 Authentication

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | /auth/register | Register new user |
| POST   | /auth/login    | Login user        |

---

### 📋 Tasks

| Method | Endpoint   | Description    |
| ------ | ---------- | -------------- |
| GET    | /api/tasks     | Get all tasks  |
| GET    | /api/tasks/:id | Get task by ID |
| POST   | /api/tasks     | Create a task  |
| PATCH  | /api/tasks/:id | Update a task  |
| DELETE | /api/tasks/:id | Delete a task  |

---

## 🔐 Environment Variables

1. Copy the example environment file.

```bash
cp .env.example .env
```

> On Windows, simply copy `.env.example` and rename the copy to `.env`.

2. Open `.env` and replace the placeholder values with your own.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```
### MongoDB Setup

This project uses **MongoDB Atlas**.

1. Create a free MongoDB Atlas cluster.
2. Create a database user.
3. Click **Connect → Drivers**.
4. Copy the connection string.
5. Replace `<password>` with your database user's password.
6. Paste the connection string into `MONGO_URI` inside your `.env` file.

## Prerequisites

- Node.js 20+
- npm
- MongoDB Atlas account
---

## Quick Start

```bash
git clone https://github.com/yasmineelmenofy/task-management-api.git

cd task-management-api

npm install

cp .env.example .env

npm run dev
```

## ▶️ Getting Started

### 1. Clone the repository

```bash id="p8c9vl"
git clone https://github.com/yasmineelmenofy/task-management-api.git
cd task-management-api
```
### 2. Install dependencies

```bash
npm install
```

This command installs all dependencies and development dependencies listed in `package.json`.

### 3. Run development server

```bash 
npm run dev
```

---

## 🧪 Testing

After starting the server, the API will be available at

http://localhost:5000

### Example: Register User

```json 
POST /auth/register

{
  "email": "user@test.com",
  "password": "123456"
}
```

---

### Example: Create Task

```json 
POST /api/tasks

{
  "title": "Build backend API",
  "status": "pending"
}
```

---

## 🧠 Architecture

```
Client
 ↓
Routes
 ↓
Middleware (validation + auth)
 ↓
Controllers
 ↓
Services
 ↓
Models
 ↓
MongoDB
```

---

## 📈 Current Status

✅ Task CRUD completed
✅ Validation (Zod) implemented
✅ Error handling middleware
✅ JWT Authentication (Register/Login)
🔄 Route protection (next step)
🔄 User-task relation (planned)

---

## 🔮 Future Improvements

* 🔐 Protect routes with authentication middleware
* 👤 Link tasks to authenticated users
* 📄 Swagger API documentation
* 🔍 Filtering, sorting, pagination
* 🧪 Testing with Jest
* 🐳 Docker support

---
