
import React from 'react';
import { UserService } from '../services/UserService';

const Footer: React.FC = () => {
  const user = UserService.getUserInfo();
  return (
    <footer className="mt-20 py-12 border-t border-gray-100">
      <div className="max-w-screen-md mx-auto px-6 text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} {user.name}. Tüm hakları saklıdır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
