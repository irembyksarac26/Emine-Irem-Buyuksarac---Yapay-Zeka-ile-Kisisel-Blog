
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminController } from '../../controllers/useAdminController';

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isReady, handleLogout, currentPath } = useAdminController();

  if (!isReady) return null;

  const menuItems = [
    { path: '/admin', label: '📊 Dashboard', icon: 'home' },
    { path: '/admin/yazilar', label: '📝 Yazılar', icon: 'edit' },
    { path: '/admin/yeni', label: '➕ Yeni Yazı', icon: 'plus' },
    { path: '/admin/aboneler', label: '👥 Aboneler', icon: 'users' },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col fixed h-full">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold flex items-center gap-2 text-purple-400">
            <span>🔐</span> Admin Paneli
          </h1>
        </div>
        
        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map(item => (
            <Link 
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentPath === item.path 
                  ? 'bg-purple-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700 space-y-2">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors">
             🏠 Siteyi Görüntüle
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
          >
            🚪 Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow ml-64 p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
