
import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminLoginController } from '../../controllers/useAdminLoginController';

const AdminLogin: React.FC = () => {
  const { password, setPassword, error, isLoading, handleLogin } = useAdminLoginController();

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 selection:bg-purple-500/30">
      <div className="max-w-md w-full animate-in fade-in zoom-in-95 duration-500">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-600/20 rounded-3xl border border-purple-500/30 text-4xl mb-6 shadow-2xl shadow-purple-500/10">
            🔐
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Yönetim Paneli</h1>
          <p className="text-slate-500 mt-2">Devam etmek için yönetici şifresini girin.</p>
        </div>

        <div className="bg-slate-800 p-8 rounded-[2.5rem] border border-slate-700 shadow-2xl relative overflow-hidden">
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl rounded-full -mr-16 -mt-16"></div>

          <form onSubmit={handleLogin} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                Admin Şifresi
              </label>
              <div className="relative">
                <input 
                  autoFocus
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full bg-slate-900/50 border ${error ? 'border-red-500/50' : 'border-slate-700'} rounded-2xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all placeholder:text-slate-700`}
                />
                {error && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500 animate-in fade-in slide-in-from-right-2">
                    ⚠️
                  </div>
                )}
              </div>
              {error && (
                <p className="text-red-500 text-xs font-bold ml-1 animate-in slide-in-from-top-1">
                  {error}
                </p>
              )}
            </div>

            <button 
              disabled={isLoading}
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-xl shadow-purple-900/20 transition-all transform active:scale-95 flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                'Giriş Yap'
              )}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <Link to="/" className="text-slate-500 hover:text-purple-400 text-sm font-medium transition-colors flex items-center justify-center gap-2">
            ← Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
