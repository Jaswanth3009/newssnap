# 📰 NewsSnap — MERN Stack News Application

> A modern news aggregation platform built with MongoDB, Express, React, Node.js + JWT Auth

---

## 🗂️ Project Structure

```
newssnap/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── newsController.js
│   ├── middleware/authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── News.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── newsRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── NewsCard.jsx
    │   │   ├── CategoryFilter.jsx
    │   │   ├── SearchBar.jsx
    │   │   └── LoadingSkeleton.jsx
    │   ├── context/AuthContext.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── Dashboard.jsx
    │   │   ├── Bookmarks.jsx
    │   │   └── Profile.jsx
    │   ├── routes/ProtectedRoute.jsx
    │   ├── services/api.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── tailwind.config.js
    └── vite.config.js
```

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas account
- (Optional) NewsAPI key from https://newsapi.org

---

### 1. Clone / Copy the project

```bash
# Go into the project folder
cd newssnap
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Edit the `.env` file:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/newssnap
JWT_SECRET=newssnap_super_secret_jwt_key_2025
NEWS_API_KEY=your_newsapi_key_here   # Optional - mock data works without it
```

> 💡 **MongoDB Atlas**: Replace MONGO_URI with your Atlas connection string  
> 💡 **NewsAPI**: Get a free key at https://newsapi.org/register

Start the backend:
```bash
npm run dev     # Development (with nodemon)
# OR
npm start       # Production
```

Backend runs on: **http://localhost:5000**

---

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

## 🔗 API Endpoints

### Auth
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/auth/register | Public | Register new user |
| POST | /api/auth/login | Public | Login user |
| GET | /api/auth/profile | Private | Get user profile |
| PUT | /api/auth/preferences | Private | Update categories |

### News
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | /api/news | Public | Get all news (filter/search/paginate) |
| GET | /api/news/:id | Public | Get single news |
| POST | /api/news | Private | Create news manually |
| PUT | /api/news/:id | Private | Update news |
| DELETE | /api/news/:id | Private | Delete news |
| POST | /api/news/fetch | Private | Fetch from NewsAPI |
| POST | /api/news/:id/bookmark | Private | Toggle bookmark |
| GET | /api/news/bookmarks | Private | Get user bookmarks |

---

## 🚀 Deployment

### Deploy Backend to Render (Free)
1. Go to https://render.com
2. New → Web Service → Connect your GitHub repo
3. Set:
   - Build command: `cd backend && npm install`
   - Start command: `cd backend && npm start`
4. Add Environment Variables (from your .env)
5. Deploy → You'll get a URL like `https://newssnap-api.onrender.com`

### Deploy Frontend to Vercel (Free)
1. Go to https://vercel.com
2. Import your GitHub repo
3. Set root directory to `frontend`
4. Add env variable:
   - `VITE_API_URL=https://newssnap-api.onrender.com`
5. In `frontend/src/services/api.js`, update baseURL:
   ```js
   baseURL: import.meta.env.VITE_API_URL || '/api'
   ```
6. Deploy → You'll get a URL like `https://newssnap.vercel.app`

---

## ✅ Features Implemented

- [x] JWT Authentication (Register / Login / Logout)
- [x] bcrypt password hashing
- [x] Protected routes (frontend + backend middleware)
- [x] Full CRUD for news articles
- [x] NewsAPI integration with mock data fallback
- [x] Category filtering (Technology, Sports, Business, etc.)
- [x] Search news by headline
- [x] Bookmark / unbookmark articles
- [x] User preferences (category selection)
- [x] Pagination (Load More)
- [x] Responsive design (Tailwind CSS)
- [x] Toast notifications
- [x] Loading skeletons
- [x] Context API for global auth state
- [x] Axios with JWT interceptor
- [x] MVC architecture on backend
- [x] .env environment configuration

---

## 👨‍💻 Team

| ID | Name |
|----|------|
| AP24110011885 | Y. Dharma Teja |
| AP24110011954 | T. Jaswan |
| AP24110011944 | D. Rahul |
| AP24110011966 | M. Lokesh |
| AP24110011941 | T. Hari Venkat |

**SRM University, AP — Amaravati**
