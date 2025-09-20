import React, { createContext, useContext, useEffect, useState } from 'react';
import { onUserStateChange, signIn, signUp, logOut } from '../Auth/authService';
import { updateProfile } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { app } from '../../firebase';

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
    const user = await signIn(email, password);
    setLoading(false);
  };

  const signup = async (email, password, name) => {
    setLoading(true);
    try {
      const user = await signUp(email, password);
      // Update Firebase Auth profile with display name
      await updateProfile(user, { displayName: name });
      // Push to Firestore users table
      const firestore = getFirestore(app);
      await setDoc(doc(firestore, 'users', user.uid), {
        displayName: name,
        email: user.email,
        createdAt: new Date().toISOString(),
      }, { merge: true });
      setLoading(false);
      return user;
    } catch (error) {
      setLoading(false);
      throw error;
    }
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
