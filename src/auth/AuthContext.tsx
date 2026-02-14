import React, { createContext, useContext, useEffect, useState } from 'react';

type User = { id: string; email: string; name?: string; company?: string; role?: string } | null;

type AuthContextValue = {
  user: User;
  token: string | null;
  login: (email: string, password?: string) => Promise<void>;
  signup: (userData: { name: string; email: string; companyName: string }) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('auth_token'));
  const [user, setUser] = useState<User>(null);

  // Mock Database in LocalStorage
  const getMockUsers = () => JSON.parse(localStorage.getItem('mock_users') || '[]');
  const saveMockUser = (newUser: any) => {
    const users = getMockUsers();
    localStorage.setItem('mock_users', JSON.stringify([...users, newUser]));
  };

  async function mockFetchMe(tok: string) {
    // In a real app, this would verify the token with the server
    const savedUser = localStorage.getItem('current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_token');
    }
  }

  useEffect(() => {
    if (token) mockFetchMe(token);
  }, [token]);

  const login = async (email: string, password?: string) => {
    // Simple mock login: find user by email
    const users = getMockUsers();
    const foundUser = users.find((u: any) => u.email === email);

    if (foundUser) {
      const mockToken = `mock-jwt-${Date.now()}`;
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('current_user', JSON.stringify(foundUser));
      setToken(mockToken);
      setUser(foundUser);
    } else {
      throw new Error('User not found. Please sign up.');
    }
  };

  const signup = async (userData: { name: string; email: string; companyName: string }) => {
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...userData,
      company: userData.companyName,
      role: 'admin'
    };

    saveMockUser(newUser);
    const mockToken = `mock-jwt-${Date.now()}`;
    localStorage.setItem('auth_token', mockToken);
    localStorage.setItem('current_user', JSON.stringify(newUser));
    setToken(mockToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


