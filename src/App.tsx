import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminDashboard from './pages/AdminDashboard';
import UserLogin from './pages/UserLogin';
import UserRegister from './pages/UserRegister';
import UserProfile from './pages/UserProfile';
import SellAccount from './pages/SellAccount';
import BuyerPosting from './pages/BuyerPosting';
import ProtectedRoute from './components/ProtectedRoute';
import UserProtectedRoute from './components/UserProtectedRoute';
export function App() {
  return <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="admin/login" element={<AdminLogin />} />
              <Route path="admin/register" element={<AdminRegister />} />
              <Route path="admin/dashboard" element={<ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>} />
              <Route path="login" element={<UserLogin />} />
              <Route path="register" element={<UserRegister />} />
              <Route path="profile" element={<UserProtectedRoute>
                    <UserProfile />
                  </UserProtectedRoute>} />
              <Route path="sell" element={<UserProtectedRoute>
                    <SellAccount />
                  </UserProtectedRoute>} />
              <Route path="buyer-posting" element={<UserProtectedRoute>
                    <BuyerPosting />
                  </UserProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>;
}