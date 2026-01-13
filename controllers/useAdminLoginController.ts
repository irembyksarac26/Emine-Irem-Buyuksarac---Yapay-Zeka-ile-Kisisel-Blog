
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminService } from '../services/AdminService';

export const useAdminLoginController = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Small timeout to simulate a real auth check and give feedback
    setTimeout(() => {
      if (AdminService.login(password)) {
        navigate('/admin');
      } else {
        setError('Hatalı şifre. Lütfen tekrar deneyin.');
        setIsLoading(false);
      }
    }, 600);
  };

  return {
    password,
    setPassword,
    error,
    isLoading,
    handleLogin
  };
};
