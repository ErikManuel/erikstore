'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay sesión guardada
    const savedUser = localStorage.getItem('ErikStore_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('ErikStore_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Demo credentials
    const demoEmail = process.env.NEXT_PUBLIC_DEMO_EMAIL || 'demo@ErikStore.com';
    const demoPassword = process.env.NEXT_PUBLIC_DEMO_PASSWORD || 'Demo123456';

    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));

    if (email === demoEmail && password === demoPassword) {
      const userData = {
        id: '1',
        email: demoEmail,
        name: 'Usuario Demo',
        role: 'customer'
      };
      setUser(userData);
      localStorage.setItem('ErikStore_user', JSON.stringify(userData));
      return { success: true };
    }
    
    return { success: false, error: 'Credenciales inválidas' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ErikStore_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};