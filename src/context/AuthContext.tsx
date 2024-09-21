import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  nombre: string;
  email: string;
  telefono: string;
  documento: string;
  categoria: string;
  suscripcion_activa: boolean;
  confirmada: boolean;
  foto: string
}

interface AuthContextProps {
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  updateUserContext: (updatedUser: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUserContext = (updatedUser: Partial<User>) => {
    if (user) {
      const newUser = { ...user, ...updatedUser };  // Combina el usuario actual con los campos actualizados
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));  // Actualiza también en localStorage
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUserContext }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUser must be used within an AuthProvider');
  }
  return context;
};
