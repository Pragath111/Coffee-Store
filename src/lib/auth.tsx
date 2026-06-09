import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (userId: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is already logged in
    const authStatus = localStorage.getItem('isAdminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (userId: string, password: string) => {
    // Mock authentication with fixed credentials
    setIsLoading(true);
    
    // Simulate network delay for realism
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (userId === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('isAdminAuthenticated', 'true');
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = async () => {
    setIsLoading(true);
    // Simulate a brief sign-out process
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsAuthenticated(false);
    localStorage.removeItem('isAdminAuthenticated');
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
