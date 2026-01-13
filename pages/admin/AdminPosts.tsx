
import React from 'react';
import { useAdminController } from '../../controllers/useAdminController';
import { Link } from 'react-router-dom';

const AdminPosts: React.FC = () => {
  const { posts, searchTerm, setSearchTerm, handleDeletePost } = useAdminController();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">İçerik Yönetimi</h2>
          <p className="text-slate-500 mt-1">Yayınlanan tüm yazıların listesi.</p>
        </div>
        <Link to="/admin/yeni" className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-purple-900/20 active:scale-95 text-center">
          ➕ Yeni Yazı Ekle
        </Link>
      </div>

      {/* Arama Çubuğu */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-purple-400 transition-colors">
          🔍
        </div>
        <input 
          type="text"
          placeholder="Yazı başlığı veya kategoride ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-slate-800 border border-slate-700 rounded-2xl pl-12 pr-5 py-4 text-white outline-none focus:ring-2 focus:ring-purple-600 transition-all placeholder:text-slate-600"
        />
      </div>

      <div className="bg-slate-800 rounded-[2rem] border border-slate-700 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-700/30 text-slate-400 text-xs uppercase tracking-[0.2em]">
                <th className="px-8 py-5 font-black w-20">ID</th>
                <th className="px-8 py-5 font-black">Yazı Başlığı</th>
                <th className="px-8 py-5 font-black">Kategori</th>
                <th className="px-8 py-5 font-black">Tarih</th>
                <th className="px-8 py-5 font-black text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {posts.map(post => (
                <tr key={post.id} className="hover:bg-slate-700/20 transition-all group">
                  <td className="px-8 py-6 font-mono text-slate-500 text-sm">#{post.id}</td>
                  <td className="px-8 py-6">
                    <div className="font-bold text-slate-100 group-hover:text-purple-400 transition-colors text-lg">{post.title}</div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="inline-flex items-center px-3 py-1 bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-widest rounded-full border border-purple-500/20">
                      {post.category || 'Diğer'}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-slate-400 text-sm font-medium">
                    {post.date}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex justify-end gap-3">
                      <Link 
                        to={`/yazi/${post.id}`}
                        className="w-10 h-10 flex items-center justify-center bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-lg"
                        title="Görüntüle"
                      >
                        👁️
                      </Link>
                      <Link 
                        to={`/admin/duzenle/${post.id}`} 
                        className="w-10 h-10 flex items-center justify-center bg-slate-900 hover:bg-purple-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-lg"
                        title="Düzenle"
                      >
                        ✏️
                      </Link>
                      <button 
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="w-10 h-10 flex items-center justify-center bg-slate-900 hover:bg-red-600 text-slate-400 hover:text-white rounded-xl transition-all shadow-lg"
                        title="Sil"
                        type="button"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <div className="text-slate-500 italic">Aradığınız kriterde yazı bulunamadı.</div>
                    {searchTerm && (
                      <button onClick={() => setSearchTerm('')} className="text-purple-400 font-bold mt-2 underline">Aramayı temizle</button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;
