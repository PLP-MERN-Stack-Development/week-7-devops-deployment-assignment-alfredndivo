// src/App.jsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from 'react-router-dom';

import AuthPage   from './pages/AuthPage';
import PostList   from './pages/PostList';
import PostDetail from './pages/PostDetail';
import PostForm   from './pages/PostForm';
import { authService } from './services/api';

/* ----- Navbar ----- */
const Navbar = ({ onLogout }) => (
  <header className="bg-white shadow p-4 flex justify-between items-center">
    <h1 className="font-bold text-xl">Alfred Blog</h1>
    <nav className="space-x-4">
      <Link to="/" className="text-blue-600">Posts</Link>
      <Link to="/posts/new" className="text-green-600">Create</Link>
      <button onClick={onLogout} className="text-red-600">Logout</button>
    </nav>
  </header>
);

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    authService.logout();
    window.location.href = '/auth';
  };

  const Private = ({ children }) =>
    isAuthenticated ? children : <Navigate to="/auth" replace />;

  return (
    <Router>
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <main className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/auth/*" element={<AuthPage onAuthSuccess={() => {}} />} />
          <Route path="/" element={<Private><PostList /></Private>} />
          <Route path="/posts/new" element={<Private><PostForm /></Private>} />
          <Route path="/posts/:id" element={<Private><PostDetail /></Private>} />
          <Route path="/posts/:id/edit" element={<Private><PostForm /></Private>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
