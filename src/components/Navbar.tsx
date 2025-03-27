import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, ShoppingBagIcon, UploadIcon, UserIcon, MessageSquareIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
const Navbar: React.FC = () => {
  const {
    isAuthenticated: isAdminAuthenticated
  } = useAuth();
  const {
    isAuthenticated: isUserAuthenticated,
    user,
    logout
  } = useUser();
  const location = useLocation();
  const isAdminPage = location.pathname.includes('/admin');
  if (isAdminPage && location.pathname !== '/admin/login' && location.pathname !== '/admin/register') {
    return null;
  }
  return <nav className="bg-blue-600 text-white p-3">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl">Clash Marketplace</span>
        </Link>
        <div className="flex items-center space-x-1 md:space-x-4">
          <Link to="/" className="flex items-center py-1 px-2 hover:bg-blue-700 rounded">
            <HomeIcon size={18} className="mr-1" />
            <span>Home</span>
          </Link>
          {isUserAuthenticated && <>
              <Link to="/sell" className="flex items-center py-1 px-2 hover:bg-blue-700 rounded">
                <ShoppingBagIcon size={18} className="mr-1" />
                <span>Sell Account</span>
              </Link>
              <Link to="/buyer-posting" className="flex items-center py-1 px-2 hover:bg-blue-700 rounded">
                <MessageSquareIcon size={18} className="mr-1" />
                <span>Buyer Posts</span>
              </Link>
              <Link to="/profile" className="flex items-center py-1 px-2 hover:bg-blue-700 rounded">
                <UserIcon size={18} className="mr-1" />
                <span>{user?.username || 'Profile'}</span>
              </Link>
              <button onClick={() => logout()} className="flex items-center py-1 px-2 bg-red-500 hover:bg-red-600 rounded">
                <span>Logout</span>
              </button>
            </>}
          {!isUserAuthenticated && <>
              <Link to="/login" className="flex items-center py-1 px-2 bg-green-600 hover:bg-green-700 rounded">
                <span>Login</span>
              </Link>
              <Link to="/register" className="flex items-center py-1 px-2 bg-green-600 hover:bg-green-700 rounded">
                <span>Register</span>
              </Link>
            </>}
          <Link to={isAdminAuthenticated ? '/admin/dashboard' : '/admin/login'} className="flex items-center py-1 px-2 bg-yellow-500 hover:bg-yellow-600 rounded">
            <span>Admin</span>
          </Link>
        </div>
      </div>
    </nav>;
};
export default Navbar;