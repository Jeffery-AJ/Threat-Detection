'use client';

import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  isFirstTime: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  completeOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user:', error);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    if (email && password.length >= 6) {
      const newUser: User = {
        id: Math.random().toString(36).substring(7),
        email,
        name: email.split('@')[0],
        isFirstTime: true,
      };
      setUser(newUser);
      try {
        localStorage.setItem('user', JSON.stringify(newUser));
      } catch (error) {
        console.error('Failed to save user:', error);
      }
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = (): void => {
    setUser(null);
    try {
      localStorage.removeItem('user');
    } catch (error) {
      console.error('Failed to clear user:', error);
    }
  };

  const completeOnboarding = (): void => {
    if (user) {
      const updatedUser: User = { ...user, isFirstTime: false };
      setUser(updatedUser);
      try {
        localStorage.setItem('user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Failed to update user:', error);
      }
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    completeOnboarding,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
