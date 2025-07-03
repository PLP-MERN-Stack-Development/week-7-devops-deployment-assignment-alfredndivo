# 📝 MERN Blog Platform – Week 4 Integration Assignment

A full-featured blogging platform built with the **MERN stack** (MongoDB, Express, React, Node.js) as part of the PLP Full Stack Development course. This project covers all core functionality: backend API, frontend integration, authentication, image uploads, comments, pagination, and more.

---

## ✅ Task 1: Project Setup

- ✅ Set up a project with a clear directory structure for both client and server
- ✅ Configure MongoDB connection using Mongoose
- ✅ Set up Express.js server with necessary middleware
- ✅ Create a React front-end using Vite and configure proxy for API calls
- ✅ Implement environment variables for configuration management

---

## ✅ Task 2: Back-End Development

- ✅ Designed a RESTful API with the following routes:
  - `GET /api/posts` – Fetch all blog posts
  - `GET /api/posts/:id` – Fetch a single post
  - `POST /api/posts` – Create a post (auth protected)
  - `PUT /api/posts/:id` – Update a post
  - `DELETE /api/posts/:id` – Delete a post
  - `GET /api/categories` – Fetch all categories
  - `POST /api/categories` – Add a new category
- ✅ Mongoose models: `Post`, `Category`, and `User`
- ✅ Input validation using `express-validator`
- ✅ Global error handling middleware

---

## ✅ Task 3: Front-End Development

- ✅ React components:
  - PostList, PostDetail, PostForm (create/edit), AuthPage
  - Navigation and layout system
- ✅ React Router for navigation between pages
- ✅ State management with `useState`, `useEffect`, and context for auth
- ✅ Created a **custom hook** `useApi()` to handle all API calls

---

## ✅ Task 4: Integration and Data Flow

- ✅ Axios-based API service layer in React
- ✅ Centralized API hooks to handle posts/categories
- ✅ Form validation with optimistic UI feedback
- ✅ Loading spinners, error handling, and retry logic

---

## ✅ Task 5: Advanced Features

- ✅ 🔐 User Authentication (JWT-based login, register, protected routes)
- ✅ 🖼️ Image Uploads for blog post thumbnails using Multer
- ✅ 🧭 Pagination on the post list view
- ✅ 🔍 Search/filter posts by keyword
- ✅ 💬 Commenting system for authenticated users

---

## 📁 Project Structure

week-4-mern-integration-assignment/
├── client/ # React frontend (Vite)
│ ├── src/
│ │ ├── pages/ # PostList, PostDetail, PostForm, AuthPage
│ │ ├── services/ # API service using Axios
│ │ ├── hooks/ # Custom useApi hook
│ │ ├── context/ # Auth context
│ └── index.html
│
├── server/ # Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ ├── uploads/ # Uploaded images
│ ├── .env
│ └── server.js


---

## 🚀 How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/alfredndivo/week-4-mern-integration-assignment-alfredndivo.git
cd week-4-mern-integration-assignment-alfredndivo

cd server
pnpm install

# .env file inside /server
MONGODB_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
PORT=5000


Frontend Setup (React + Vite)
cd ../client
pnpm install
pnpm dev

