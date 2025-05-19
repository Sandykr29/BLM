# 📚 Books Library Management App

A full-stack web application for managing your personal library, built by **Sandeep Kumar**.

---

## 🚀 Live Demo

- **Frontend:** [https://blm-livid.vercel.app/](https://blm-livid.vercel.app/)
- **Backend API:** [https://blm-q9lr.onrender.com/api](https://blm-q9lr.onrender.com/api)

---

## 🛠️ Tech Stack

**Frontend:**
- [Vite](https://vitejs.dev/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Router DOM](https://reactrouter.com/)

**Backend:**
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [Nodemon](https://nodemon.io/)

---

## ✨ Features

- User registration & authentication (JWT, HTTP-only cookies)
- Add, update, and delete books (CRUD)
- Personal reading list: add books, update reading status, and rate books
- Secure protected routes (only accessible to logged-in users)
- Responsive UI with Tailwind CSS

---

## 📦 API Endpoints

### 🧾 Auth Routes (Public)

- **POST `/api/auth/register`**  
  Register a new user  
  **Body:**  
  ```json
  { "email": "testuser@example.com", "password": "password123" }
  ```
  **Response:**  
  ```json
  { "message": "User created" }
  ```

- **POST `/api/auth/login`**  
  Login user, sets HTTP-only cookie  
  **Body:**  
  ```json
  { "email": "testuser@example.com", "password": "password123" }
  ```
  **Response:**  
  ```json
  { "email": "testuser@example.com" }
  ```

- **GET `/api/auth/logout`**  
  Logout user  
  **Response:**  
  ```json
  { "message": "Logged out" }
  ```

- **GET `/api/auth/me`**  
  Get current user info  
  **Response:**  
  ```json
  { "email": "testuser@example.com" }
  ```

---

### 📚 Book Routes (Protected)

- **POST `/api/books`**  
  Create a book  
  **Body:**  
  ```json
  {
    "title": "Atomic Habits",
    "author": "James Clear",
    "coverImage": "https://placehold.co/300x300/FFC300/000?text=Atomic+Habits",
    "availability": true
  }
  ```
  **Response:**  
  ```json
  {
    "_id": "bookObjectId",
    "title": "Atomic Habits",
    "author": "James Clear",
    "coverImage": "...",
    "availability": true,
    "ownerId": "userObjectId"
  }
  ```

- **GET `/api/books`**  
  Get all books created by the logged-in user

- **PATCH `/api/books/:bookId`**  
  Update a book  
  **Body:**  
  ```json
  { "title": "Atomic Habits - Updated", "availability": false }
  ```
  **Response:**  
  ```json
  { "_id": "bookObjectId", "title": "Atomic Habits - Updated", ... }
  ```

- **DELETE `/api/books/:bookId`**  
  Delete a book  
  **Response:**  
  ```json
  { "message": "Book deleted" }
  ```

---

### 📘 My Books Routes (Protected)

- **GET `/api/mybooks`**  
  Fetch books in user's personal reading list

- **POST `/api/mybooks/:bookId`**  
  Add a book to "My Books"  
  **Response:**  
  ```json
  {
    "_id": "entryId",
    "userId": "userObjectId",
    "bookId": "bookObjectId",
    "status": "Want to Read",
    "rating": 0
  }
  ```

- **PATCH `/api/mybooks/:bookId/status`**  
  Update reading status  
  **Body:**  
  ```json
  { "status": "Currently Reading" }
  ```
  **Response:**  
  ```json
  { "status": "Currently Reading" }
  ```

- **PATCH `/api/mybooks/:bookId/rating`**  
  Update rating (1–5)  
  **Body:**  
  ```json
  { "rating": 5 }
  ```
  **Response:**  
  ```json
  { "rating": 5 }
  ```

---

## 🔒 Authentication

- Protected routes require a valid JWT token (sent via HTTP-only cookie).
- Use tools like Postman or Thunder Client for testing (ensure cookies are sent).

---

## ⚙️ Environment Variables

Create a `.env` file in both frontend and backend:

**Frontend (`client/.env`):**
```
VITE_API_BASE_URL=https://blm-q9lr.onrender.com/api
```

**Backend (`.env`):**
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

---

## 🏁 Getting Started

1. **Clone the repository**
2. **Install dependencies**  
   - Frontend: `cd client && npm install`
   - Backend: `cd server && npm install`
3. **Set up environment variables**
4. **Run the app locally**  
   - Frontend: `npm run dev`
   - Backend: `npm run dev`
5. **Visit** `http://localhost:5173` (or as shown in terminal)

---

## 👤 Author

**Sandeep Kumar**

---

## 📄 License

This project is for learning and demonstration purposes.