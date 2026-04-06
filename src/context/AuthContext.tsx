import React, { createContext, useContext, useState, useCallback } from 'react';
import { AuthContextType, User } from '../types';
import {
  authenticate,
  saveUserToStorage,
  getUserFromStorage,
  removeUserFromStorage,
} from '../utils/auth';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getUserFromStorage());

  const login = useCallback((email: string, password: string): boolean => {
    const authenticated = authenticate({ email, password });
    if (authenticated) {
      setUser(authenticated);
      saveUserToStorage(authenticated);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    removeUserFromStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
