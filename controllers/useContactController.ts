
import { UserService } from '../services/UserService';
import { ThemeService } from '../services/ThemeService';
import { useState } from 'react';

export const useContactController = () => {
  const social = UserService.getSocialLinks();
  const theme = ThemeService.getColors();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Mesajınız alındı!');
  };

  return {
    social,
    theme,
    formData,
    handleInputChange,
    handleSubmit
  };
};
