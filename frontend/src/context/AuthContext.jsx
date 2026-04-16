import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister, getUserProfile } from '../services/api';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('userInfo');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await apiLogin({ email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      toast.success(`Welcome back, ${data.username}! 👋`);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
      return false;
    }
  };

  const register = async (username, email, password) => {
    try {
      const { data } = await apiRegister({ username, email, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      toast.success(`Account created! Welcome, ${data.username}! 🎉`);
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
    toast.info('Logged out successfully');
  };

  const refreshProfile = async () => {
    try {
      const { data } = await getUserProfile();
      const updated = { ...user, ...data };
      localStorage.setItem('userInfo', JSON.stringify(updated));
      setUser(updated);
    } catch {}
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
