# E-Commerce Prototype

A minimal full-stack E-Commerce prototype built with React, Express, and MongoDB.

## Features

- 🛍️ Product browsing and details
- 🛒 Shopping cart with persistent storage
- 🔐 User authentication (register/login/logout)
- 📱 Responsive design
- ⚡ Fast development with Vite
- 🗄️ MongoDB Atlas database with seed data
- 🔒 JWT authentication with HttpOnly cookies

## Tech Stack

- **Frontend:** React 18, Vite, React Router v6, Zustand, Tailwind CSS, Axios
- **Backend:** Node.js, Express, Mongoose, JWT, bcryptjs
- **Database:** MongoDB Atlas (Cloud)
- **Authentication:** JWT tokens stored in HttpOnly cookies

## Setup Instructions

### 1. Install Dependencies

```bash
npm run install-all
```

### 2. Configure Environment Files

**server/.env:**
```
MONGODB_URI=mongodb+srv://shrivasnadiger:kquiV2pj2eGxreCN@chatcmrit-dev.nwqkhjg.mongodb.net/ecommerce_prototype?retryWrites=true&w=majority&appName=chatcmrit-dev
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**client/.env:**
```
VITE_API_URL=http://localhost:5000
```

> **Note:** 
> - This project uses **MongoDB Atlas** (cloud database). The connection string is configured above.
> - Make sure to change `JWT_SECRET` to a strong, random string in production.
> - The database name is `ecommerce_prototype`.

### 3. Seed Database

If the MongoDB Atlas database is empty, seed it:

```bash
cd server
npm run seed
cd ..
```

> **Note:** The seed script will only add products if the database is empty. If products already exist, it will skip seeding.

### 4. Run Development Servers

From the project root:

```bash
npm run dev
```

This will start:
- Frontend on http://localhost:5173
- Backend on http://localhost:5000

### 5. Test API

**Public Endpoints:**
- GET http://localhost:5000/api/health → `{status:"ok"}`
- GET http://localhost:5000/api/products → array of products
- GET http://localhost:5000/api/products/:id → single product

**Authentication Endpoints:**
- POST http://localhost:5000/api/auth/register → Register new user
- POST http://localhost:5000/api/auth/login → Login user
- GET http://localhost:5000/api/auth/me → Get current user (requires authentication)
- POST http://localhost:5000/api/auth/logout → Logout user

## Authentication

### How It Works

1. **Registration/Login:** Users register or login with email and password
2. **JWT Token:** Server generates a JWT token and stores it in an HttpOnly cookie
3. **Auto-Hydration:** On page load, the app checks for an existing auth cookie and automatically logs the user in
4. **Protected Routes:** The `/api/auth/me` endpoint requires authentication via the JWT cookie
5. **Logout:** Logging out clears the HttpOnly cookie

### Testing Authentication

1. **Register a new user:**
   - Navigate to http://localhost:5173/register
   - Fill in name, email, and password (min 6 characters)
   - Click "Register"
   - You'll be redirected to the home page and see "Hello, [your name]" in the navbar

2. **Login:**
   - Navigate to http://localhost:5173/login
   - Enter your email and password
   - Click "Login"
   - You'll be redirected to the home page

3. **Check authentication state:**
   - After login, refresh the page
   - You should remain logged in (cookie persists)
   - The navbar shows your name and a "Logout" button

4. **Logout:**
   - Click the "Logout" button in the navbar
   - The auth cookie is cleared
   - You'll see "Login" and "Register" links again

### API Request Format

**Register:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Login:**
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get Current User:**
```
GET /api/auth/me
(Cookie: token=...)
```

**Logout:**
```
POST /api/auth/logout
(Cookie: token=...)
```

### Security Features

- Passwords are hashed using bcryptjs before storage
- JWT tokens are stored in HttpOnly cookies (not accessible via JavaScript)
- Cookies are set with `sameSite: 'strict'` to prevent CSRF attacks
- In production, cookies use `secure: true` (HTTPS only)

## Project Structure

```
ecommerce-prototype/
  client/          # React frontend (Vite)
  server/          # Express backend
  package.json     # Root package with concurrently scripts
  README.md
```

## Development

- Frontend: `npm --prefix client run dev`
- Backend: `npm --prefix server run dev`
- Both: `npm run dev` (from root)

## License

ISC

