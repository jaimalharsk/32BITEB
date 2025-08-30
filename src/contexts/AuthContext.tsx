import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppUser } from '../types';

interface AuthContextType {
  user: AppUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Partial<AppUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('alignclinic_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock login - replace with actual authentication
      const mockUser: AppUser = {
        id: '1',
        role: email.includes('dentist') ? 'dentist' : 'patient',
        name: email.includes('dentist') ? 'Dr. Smith' : 'John Doe',
        email,
        clinicId: 'clinic-1',
        patientId: email.includes('dentist') ? undefined : 'patient-1'
      };
      
      setUser(mockUser);
      localStorage.setItem('alignclinic_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('alignclinic_user');
  };

  const register = async (userData: Partial<AppUser>): Promise<void> => {
    setIsLoading(true);
    try {
      // Mock registration
      const newUser: AppUser = {
        id: Date.now().toString(),
        role: 'patient',
        name: userData.name || '',
        email: userData.email || '',
        clinicId: 'clinic-1',
        patientId: `patient-${Date.now()}`
      };
      
      setUser(newUser);
      localStorage.setItem('alignclinic_user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
