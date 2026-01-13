
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserService } from '../services/UserService';
import { ThemeService } from '../services/ThemeService';

interface HeaderProps {
  themeMode: 'light' | 'dark';
  onToggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ themeMode, onToggleTheme }) => {
  const location = useLocation();
  const user = UserService.getUserInfo();
  const theme = ThemeService.getColors(themeMode);

  const navItems = [
    { path: '/', label: 'Ana Sayfa' },
    { path: '/saved', label: 'Kaydedilenler' },
    { path: '/about', label: 'Hakkımda' },
    { path: '/contact', label: 'İletişim' },
    { path: '/admin', label: 'Yönetim' }
  ];

  return (
    <header 
      className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b transition-all duration-300"
      style={{ 
        boxShadow: theme.shadows.header,
        borderColor: theme.border 
      }}
    >
      <div className="max-w-screen-md mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {user.name}
        </Link>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname.startsWith(item.path) && (item.path !== '/' || location.pathname === '/')
                    ? 'text-purple-600 dark:text-purple-400' 
                    : 'text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button 
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-yellow-400 hover:scale-110 transition-all border border-transparent hover:border-gray-200 dark:hover:border-slate-600"
            aria-label="Toggle Theme"
          >
            {themeMode === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.07" x2="5.64" y2="17.66"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
