import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { AuthContext } from './authContextDef';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    api.getCurrentUser()
      .then((currentUser) => {
        if (active) {
          setUser(currentUser);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setUser(null);
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const login = async (credentials) => {
    await api.login(credentials);
    const currentUser = await api.getCurrentUser();
    setUser(currentUser);
    return currentUser;
  };

  const register = async (registrationData) => {
    await api.register(registrationData);
    const currentUser = await api.getCurrentUser();
    setUser(currentUser);
    return currentUser;
  };

  const loginWithGoogle = async (idToken) => {
    await api.loginWithGoogle(idToken);
    const currentUser = await api.getCurrentUser();
    setUser(currentUser);
    return currentUser;
  };

  const logout = async () => {
    try {
      await api.logout();
    } finally {
      setUser(null);
    }
  };

  const updateProfile = async (profileData) => {
    const updated = await api.updateProfile(profileData);
    setUser(updated);
    return updated;
  };

  const refreshUser = async () => {
    try {
      const currentUser = await api.getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch {
      setUser(null);
      return null;
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    loginWithGoogle,
    logout,
    updateProfile,
    refreshUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
