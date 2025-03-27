import React, { useEffect, useState, createContext, useContext } from 'react';
interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, password: string) => boolean;
  isAdminRegistered: boolean;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminRegistered, setIsAdminRegistered] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      setIsAuthenticated(true);
    }
    const adminExists = localStorage.getItem('adminExists');
    if (adminExists) {
      setIsAdminRegistered(true);
    }
  }, []);
  const login = (username: string, password: string) => {
    const storedUsername = localStorage.getItem('adminUsername');
    const storedPassword = localStorage.getItem('adminPassword');
    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem('adminToken', 'admin-token-' + Date.now());
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };
  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
  };
  const register = (username: string, password: string) => {
    if (isAdminRegistered) {
      return false;
    }
    localStorage.setItem('adminUsername', username);
    localStorage.setItem('adminPassword', password);
    localStorage.setItem('adminExists', 'true');
    localStorage.setItem('adminToken', 'admin-token-' + Date.now());
    setIsAdminRegistered(true);
    setIsAuthenticated(true);
    return true;
  };
  return <AuthContext.Provider value={{
    isAuthenticated,
    login,
    logout,
    register,
    isAdminRegistered
  }}>
      {children}
    </AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};