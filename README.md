# 📋 Task Manager Application

A full-stack task management application built with React Native for mobile and Next.js for the backend. Manage projects and tasks efficiently with user authentication and real-time synchronization.

---

## ✨ Features

- 🔐 **User Authentication** - Secure login and registration with JWT tokens
- 📁 **Project Management** - Create, read, update, and delete projects
- ✅ **Task Management** - Manage tasks with priorities and status tracking
- 👥 **User Assignment** - Assign tasks to team members
- 🔍 **Search & Filter** - Search and filter projects and tasks
- 📱 **Mobile First** - React Native app for iOS and Android
- 🎨 **Modern UI** - Beautiful and intuitive user interface

---

## 🛠️ Tech Stack

### **Frontend**
- React Native 0.84.1
- Redux Toolkit for state management
- React Navigation for routing
- Axios for API calls
- React Native UI Elements

### **Backend**
- Next.js 16.1.6
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Node.js runtime

---

## 📁 Project Structure

```
reactNativeAssignment/
├── server/                          # Next.js Backend
│   ├── pages/api/
│   │   ├── auth/                   # Authentication endpoints
│   │   ├── projects/               # Project management endpoints
│   │   └── tasks/                  # Task management endpoints
│   ├── models/                     # MongoDB schemas
│   ├── middleware/                 # Authentication middleware
│   ├── lib/                        # Database connection
│   └── package.json
└── taskManagerApp/                  # React Native App
    ├── src/
    │   ├── screens/                # App screens
    │   ├── components/             # Reusable components
    │   ├── api/                    # API integration layer
    │   ├── store/                  # Redux store & slices
    │   └── style/                  # Styling files
    ├── App.jsx
    └── package.json
```

---

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- MongoDB
- React Native environment setup
- Xcode (for iOS) or Android Studio (for Android)

### **Installation**

#### 1. **Backend Setup**

```bash
cd server

# Install dependencies
npm install

# Create .env file
echo "MONGODB_URI=your_mongodb_uri" > .env
echo "JWT_SECRET=your_jwt_secret" >> .env

# Run development server
npm run dev

# Server will run on http://localhost:3000
```

#### 2. **Frontend Setup**

```bash
cd taskManagerApp

# Install dependencies
npm install

# For React Native CLI setup
npx react-native doctor

# Run on iOS
npm run ios

# Run on Android
npm run android

# Or start the Metro bundler
npm start
```

---

## 🔌 API Documentation

> **Base URL:** `http://localhost:3000/api`

### **Authentication Endpoints**

#### 1. **User Registration**
```
POST /auth/register
Content-Type: application/json

{
  "name": "umang",
  "email": "umang@example.com",
  "password": "password123"
}
```

**Response (201 Created):**
```json
{
  "message": "User created",
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "umang",
    "email": "umang@example.com",
    "password": "$2a$10$hashed_password_here",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

#### 2. **User Login**
```
POST /auth/login
Content-Type: application/json

{
  "email": "umang@example.com",
  "password": "password123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWExYjJjM2Q0ZTVmNmc3aDhpOWowazEiLCJlbWFpbCI6InVtYW5nQGV4YW1wbGUuY29tIiwiaWF0IjoxNjg0MjM5NjAwLCJleHAiOjE2ODQzMjYwMDB9.signature"
}
```

---

#### 3. **Get Current User Profile**
```
GET /auth/me
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "user": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "name": "umang",
    "email": "umang@example.com",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

#### 4. **Get All Users**
```
GET /auth/alluser
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "users": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "umang",
      "email": "umang@example.com"
    },
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "name": "john",
      "email": "john@example.com"
    }
  ]
}
```

---

### **Project Endpoints**

#### 1. **Create Project** ✅
```
POST /projects/create
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "E-Commerce Platform",
  "description": "Build a modern e-commerce platform with React and Node.js"
}
```

**Response (201 Created):**
```json
{
  "message": "Project created",
  "project": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "E-Commerce Platform",
    "description": "Build a modern e-commerce platform with React and Node.js",
    "user": "65a1b2c3d4e5f6g7h8i9j0k1",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

#### 2. **Get All Projects**
```
GET /projects/allprojects?page=1&limit=10&search=&sort=createdAt
```

**Response (200 OK):**
```json
{
  "page": 1,
  "limit": 10,
  "total": 2,
  "totalPages": 1,
  "projects": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "title": "E-Commerce Platform",
      "description": "Build a modern e-commerce platform with React and Node.js",
      "user": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "name": "umang",
        "email": "umang@example.com"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

#### 3. **Get Single Project**
```
GET /projects/[id]
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "project": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "E-Commerce Platform",
    "description": "Build a modern e-commerce platform with React and Node.js",
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "umang",
      "email": "umang@example.com"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

#### 4. **Update Project**
```
PUT /projects/[id]
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "E-Commerce Platform v2",
  "description": "Updated description with new features"
}
```

**Response (200 OK):**
```json
{
  "message": "Project updated",
  "project": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "E-Commerce Platform v2",
    "description": "Updated description with new features",
    "user": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "name": "umang",
      "email": "umang@example.com"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:45:00.000Z"
  }
}
```

---

#### 5. **Delete Project**
```
DELETE /projects/[id]
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "message": "Project deleted successfully"
}
```

---

### **Task Endpoints**

#### 1. **Create Task**
```
POST /tasks/create?projectId=65a1b2c3d4e5f6g7h8i9j0k1
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Design Homepage",
  "description": "Create a responsive homepage design",
  "status": "todo",
  "priority": "High",
  "dueDate": "2024-02-15",
  "assignedToUser": "65a1b2c3d4e5f6g7h8i9j0k2"
}
```

**Response (201 Created):**
```json
{
  "message": "task added successfully",
  "task": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "title": "Design Homepage",
    "description": "Create a responsive homepage design",
    "status": "todo",
    "priority": "High",
    "dueDate": "2024-02-15T00:00:00.000Z",
    "project": "65a1b2c3d4e5f6g7h8i9j0k1",
    "createdBy": "65a1b2c3d4e5f6g7h8i9j0k1",
    "assignedToUser": "65a1b2c3d4e5f6g7h8i9j0k2",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

#### 2. **Get All Tasks for Project**
```
GET /tasks/alltask?projectId=65a1b2c3d4e5f6g7h8i9j0k1&status=todo&priority=High
Authorization: Bearer {token}
```

**Response (200 OK):**
```json
{
  "tasks": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
      "title": "Design Homepage",
      "description": "Create a responsive homepage design",
      "status": "todo",
      "priority": "High",
      "dueDate": "2024-02-15T00:00:00.000Z",
      "project": "65a1b2c3d4e5f6g7h8i9j0k1",
      "createdBy": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "name": "umang",
        "email": "umang@example.com"
      },
      "assignedToUser": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "name": "john",
        "email": "john@example.com"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

#### 3. **Update Task**
```
PUT /tasks/[id]
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Design Homepage - Updated",
  "description": "Create a responsive homepage design with animations",
  "status": "in-progress",
  "priority": "High",
  "dueDate": "2024-02-20",
  "assignedToUser": "65a1b2c3d4e5f6g7h8i9j0k2"
}
```

**Response (200 OK):**
```json
{
  "message": "Task updated successfully",
  "task": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "title": "Design Homepage - Updated",
    "description": "Create a responsive homepage design with animations",
    "status": "in-progress",
    "priority": "High",
    "dueDate": "2024-02-20T00:00:00.000Z",
    "project": "65a1b2c3d4e5f6g7h8i9j0k1",
    "createdBy": "65a1b2c3d4e5f6g7h8i9j0k1",
    "assignedToUser": "65a1b2c3d4e5f6g7h8i9j0k2",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T11:50:00.000Z"
  }
}
```

---

## 📊 Database Models

### **User Schema**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### **Project Schema**
```javascript
{
  title: String,
  description: String,
  user: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### **Task Schema**
```javascript
{
  title: String,
  description: String,
  status: String (todo, in-progress, completed),
  priority: String (Low, Medium, High),
  dueDate: Date,
  project: ObjectId (ref: Project),
  createdBy: ObjectId (ref: User),
  assignedToUser: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔒 Authentication

All protected endpoints require the `Authorization` header with a Bearer token:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Token Expiration:** 24 hours

---

## 📝 Available Scripts

### **Backend**
```bash
npm run dev     # Start development server
npm run build   # Build for production
npm start       # Start production server
npm run lint    # Run ESLint
```

### **Frontend**
```bash
npm start            # Start Metro bundler
npm run ios          # Run on iOS simulator
npm run android      # Run on Android emulator
npm run lint         # Run ESLint
npm test             # Run tests
```

---

## ⚙️ Environment Variables

### **Backend (.env)**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

### **Frontend (.env)**
```
API_BASE_URL=http://localhost:3000/api
```

---

## 🐛 Error Handling

All API endpoints return standardized error responses:

```json
{
  "message": "Error description"
}
```

**Common Status Codes:**
- `400` - Bad Request / Missing fields
- `401` - Unauthorized / Invalid token
- `403` - Forbidden / No permission
- `404` - Not Found
- `500` - Internal Server Error

---

## 📱 Mobile App Features

- **Login/Register Screen** - User authentication
- **Home Screen** - View all projects
- **Project Detail Screen** - View project tasks
- **Add/Edit Project** - Create and modify projects
- **Add/Edit Task** - Create and modify tasks
- **Task Filtering** - Filter by status and priority
- **Responsive Design** - Optimized for all screen sizes

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💼 Author

**Umang** - Full Stack Developer

---

## 📞 Support

For issues and questions, please open an issue on GitHub or contact the development team.

---

**Happy Coding! 🚀**
