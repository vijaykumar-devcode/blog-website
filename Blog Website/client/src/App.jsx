import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './layouts/MainLayout';
import Home from './pages/public/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PostDetail from './pages/public/PostDetail';
import Profile from './pages/public/Profile';
import Contact from './pages/public/Contact';
import Category from './pages/public/Category';
import About from './pages/public/About';
import NotFound from './pages/public/NotFound';
import ForgotPassword from './pages/auth/ForgotPassword';
import Tag from './pages/public/Tag';
import Dashboard from './pages/dashboard/Dashboard';
import CreatePost from './pages/dashboard/CreatePost';
import EditPost from './pages/dashboard/EditPost';
import Settings from './pages/dashboard/Settings';
import Notifications from './pages/dashboard/Notifications';
import AdminDashboard from './pages/admin/AdminDashboard';
import PendingReview from './pages/admin/PendingReview';
import UsersManagement from './pages/admin/UsersManagement';
import ProtectedRoute from './components/common/ProtectedRoute';

function App() {
  return (
    <Router>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="posts/:slug" element={<PostDetail />} />
          <Route path="profile/:id" element={<Profile />} />
          <Route path="category/:slug" element={<Category />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="tag/:slug" element={<Tag />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NotFound />} />

          {/* User Routes */}
          <Route element={<ProtectedRoute roles={['user', 'author', 'editor', 'admin', 'super_admin']} />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="write" element={<CreatePost />} />
            <Route path="edit/:id" element={<EditPost />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute roles={['admin', 'super_admin']} />}>
            <Route path="admin" element={<AdminDashboard />} />
            <Route path="admin/posts" element={<PendingReview />} />
            <Route path="admin/users" element={<UsersManagement />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
