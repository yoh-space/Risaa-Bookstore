import React, { createContext, useContext, useEffect, useState } from 'react';
import { onUserStateChange, signIn, signUp, logOut } from '../Auth/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onUserStateChange((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
  };

  const signup = async (email, password) => {
    setLoading(true);
    await signUp(email, password);
    setLoading(false);
  };

  const logout = async () => {
    setLoading(true);
    await logOut();
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
