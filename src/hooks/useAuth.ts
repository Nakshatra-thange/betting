import { useState, useEffect } from 'react';
import { User } from '../types';
import { apiClient } from '../lib/api';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      // This would be a new endpoint to check current user
      const response = await fetch('/api/auth/me');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await apiClient.auth.login(email, password);
    setUser(response.user);
    return response;
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await apiClient.auth.register(email, password, name);
    setUser(response.user);
    return response;
  };

  const logout = async () => {
    await apiClient.auth.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isPremium: user?.plan === 'PREMIUM',
  };
}