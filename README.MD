# 🗂️ Task Management System

A lightweight and efficient Task Management System built with **Node.js** and **Express.js**, designed to help small teams create, assign, track, and manage tasks collaboratively.

---

## 📌 Features

- ✅ User authentication (sign up, login)
- ✅ Create and assign tasks to team members
- ✅ Track task progress (To Do, In Progress, Completed)
- ✅ Set due dates and priorities
- ✅ Comment on tasks
- ✅ Filter and search tasks
- ✅ Role-based access (Admin, User)

---

## 📁 Project Structure

```
task-management-system/
├── controllers/       # Route logic
├── models/            # Mongoose or DB schemas
├── routes/            # Express route definitions
├── middlewares/       # Auth, error handling, etc.
├── config/            # Configuration (e.g., DB)
├── utils/             # Helper functions
├── index.js           # Entry point
└── .gitignore         # Ignored files
```

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **Environment Config**: dotenv
- **Validation**: Joi or express-validator (optional)

---

## 🚦 API Overview

| Method | Endpoint            | Description                 | Auth Required |
|--------|---------------------|-----------------------------|---------------|
| POST   | `/auth/signup`      | Register a new user         | ❌            |
| POST   | `/auth/login`       | Login user and return token | ❌            |
| GET    | `/tasks`            | Get all tasks               | ✅            |
| POST   | `/tasks`            | Create a new task           | ✅            |
| PUT    | `/tasks/:id`        | Update a task               | ✅            |
| DELETE | `/tasks/:id`        | Delete a task               | ✅            |
| PATCH  | `/tasks/:id/status` | Update task status          | ✅            |

---

## 🔐 Roles & Permissions

- **Admin**: Full access to all features including user management
- **User**: Can manage their own tasks and view assigned tasks

---

## 📦 Environment Variables

Make sure to define the following variables in a `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🧪 Testing

- Use **Postman** or **cURL** to test endpoints.
- Consider using a tool like **Jest** or **Mocha** for automated tests.

---

## 👥 Contributing

Feel free to fork this repository and open pull requests for improvements or bug fixes. Contributions are welcome!