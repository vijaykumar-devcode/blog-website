# AuraBlog - Full Stack Multi-Role Blogging Platform (MERN)

A powerful, secure, and scalable blogging platform built with MongoDB, Express, React, and Node.js.

## 🚀 Features

- **Role-Based Access Control (RBAC)**: Super Admin, Admin, Editor, Author, Contributor, and Registered User.
- **Workflow Management**: Draft -> Submitted -> Approved -> Published.
- **Rich User Interactions**: Likes, Bookmarks, and nested Comments.
- **Admin Dashboard**: Analytics, User Management, and Content Moderation.
- **SEO Ready**: Slug generation and meta tags support.
- **Modern UI**: Clean, responsive design built with Tailwind CSS and Framer Motion.

## 🛠 Tech Stack

- **Frontend**: React.js, Vite, Redux Toolkit, Tailwind CSS, Lucide Icons.
- **Backend**: Node.js, Express.js, JWT, Bcrypt.
- **Database**: MongoDB with Mongoose ODM.

## 🏃 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (Local or Atlas)

### 1. Clone & Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-platform
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d
NODE_ENV=development
```

### 2. Seed the Database

```bash
node seeder.js -i
```

### 3. Run Backend

```bash
npm start
```

### 4. Setup Frontend

```bash
cd client
npm install
npm run dev
```

## 👥 Default Accounts (Seeded)

- **Super Admin**: superadmin@blog.com / password123
- **Admin**: admin1@blog.com / password123
- **Author**: author1@blog.com / password123
- **User**: user1@blog.com / password123

## 📂 Project Structure

### Backend
- `controllers/`: Request handlers.
- `models/`: Mongoose schemas.
- `routes/`: API endpoint definitions.
- `middleware/`: Auth and error handlers.
- `config/`: Database connection.

### Frontend
- `src/components/`: Reusable UI elements.
- `src/pages/`: Main application views.
- `src/store/`: Redux state management.
- `src/services/`: API calls using Axios.
- `src/layouts/`: Common page structures.
