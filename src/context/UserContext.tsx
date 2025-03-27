import React, { useEffect, useState, createContext, useContext } from 'react';
interface User {
  id: string;
  username: string;
  email: string;
  contactInfo?: string;
}
interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  register: (username: string, email: string, password: string) => boolean;
  updateProfile: (data: Partial<User>) => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);
export const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const token = localStorage.getItem('userToken');
    if (userData && token) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
  }, []);
  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find((u: any) => u.email === email && u.password === password);
    if (foundUser) {
      const userData = {
        id: foundUser.id,
        username: foundUser.username,
        email: foundUser.email,
        contactInfo: foundUser.contactInfo
      };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('userData', JSON.stringify(userData));
      localStorage.setItem('userToken', 'user-token-' + Date.now());
      return true;
    }
    return false;
  };
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userData');
    localStorage.removeItem('userToken');
  };
  const register = (username: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some((u: any) => u.email === email)) {
      return false;
    }
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    const userData = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userToken', 'user-token-' + Date.now());
    return true;
  };
  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = {
        ...user,
        ...data
      };
      setUser(updatedUser);
      localStorage.setItem('userData', JSON.stringify(updatedUser));
      // Update in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: any) => u.id === user.id ? {
        ...u,
        ...data
      } : u);
      localStorage.setItem('users', JSON.stringify(updatedUsers));
    }
  };
  return <UserContext.Provider value={{
    user,
    isAuthenticated,
    login,
    logout,
    register,
    updateProfile
  }}>
      {children}
    </UserContext.Provider>;
};
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};