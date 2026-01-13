
import React from 'react';
import { useAdminController } from '../../controllers/useAdminController';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const { stats, posts } = useAdminController();

  const statCards = [
    { label: 'Toplam Yazı', value: stats.posts, icon: '📝', color: 'from-blue-600 to-blue-400', sub: 'Yayınlanan içerik' },
    { label: 'Beğeniler', value: stats.likes, icon: '❤️', color: 'from-red-600 to-red-400', sub: 'Okuyucu etkileşimi' },
    { label: 'Abone Sayısı', value: stats.subs, icon: '👥', color: 'from-green-600 to-green-400', sub: 'Newsletter kitlesi' },
    { label: 'Görüntülenme', value: stats.views, icon: '👁️', color: 'from-purple-600 to-purple-400', sub: 'Aylık ortalama' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
          <p className="text-slate-500 mt-1">Hoş geldiniz, sistem durumu ve istatistikler güncel.</p>
        </div>
        <div className="flex gap-3">
           <Link to="/admin/yeni" className="bg-purple-600 hover:bg-purple-700 px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-purple-900/20 active:scale-95">
             ➕ Yeni Yazı
           </Link>
           <Link to="/" className="bg-slate-800 border border-slate-700 hover:bg-slate-700 px-6 py-2.5 rounded-xl font-bold transition-all">
             🏠 Siteye Git
           </Link>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map(card => (
          <div key={card.label} className="bg-slate-800 rounded-3xl border border-slate-700 p-6 shadow-xl relative overflow-hidden group">
            <div className="relative z-10">
               <div className={`w-12 h-12 bg-gradient-to-br ${card.color} rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-lg`}>
                {card.icon}
              </div>
              <div className="text-3xl font-bold tracking-tighter">{card.value}</div>
              <div className="text-slate-100 text-sm font-bold mt-1 uppercase tracking-wider">{card.label}</div>
              <div className="text-slate-500 text-xs mt-2">{card.sub}</div>
            </div>
            <div className={`absolute -right-2 -bottom-2 text-6xl opacity-5 group-hover:scale-110 transition-transform duration-500`}>
              {card.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Posts - Takes up 2/3 */}
        <section className="xl:col-span-2 bg-slate-800 rounded-3xl border border-slate-700 p-8 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
               <span className="w-1.5 h-6 bg-purple-500 rounded-full"></span>
               Son Yayınlananlar
            </h3>
            <Link to="/admin/yazilar" className="text-slate-400 text-sm hover:text-purple-400 transition-colors font-medium">Tümünü Yönet →</Link>
          </div>
          
          <div className="space-y-4">
            {posts.slice(0, 5).map(post => (
              <div key={post.id} className="flex items-center justify-between p-5 bg-slate-900/50 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-all group">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl overflow-hidden bg-slate-800 hidden sm:block">
                      <img src={post.heroImage} alt="" className="w-full h-full object-cover opacity-60" />
                   </div>
                   <div>
                    <div className="font-bold text-slate-200 group-hover:text-white transition-colors">{post.title}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                      <span>📅 {post.date}</span>
                      <span>•</span>
                      <span>⏱️ {post.readTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                   <Link 
                    to={`/admin/duzenle/${post.id}`} 
                    className="w-10 h-10 flex items-center justify-center bg-slate-800 hover:bg-purple-600/20 text-slate-400 hover:text-purple-400 rounded-xl transition-all"
                   >
                     ✏️
                   </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Insights / Timeline - Takes up 1/3 */}
        <section className="bg-slate-800 rounded-3xl border border-slate-700 p-8 shadow-xl">
           <h3 className="text-xl font-bold mb-8">Hızlı Bilgiler</h3>
           
           <div className="space-y-6">
              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 flex-shrink-0">
                    📢
                 </div>
                 <div>
                    <div className="text-sm font-bold">Yeni Abone</div>
                    <p className="text-xs text-slate-500 mt-0.5">Az önce bir kullanıcı bültene kayıt oldu.</p>
                 </div>
              </div>

              <div className="flex gap-4">
                 <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0">
                    📈
                 </div>
                 <div>
                    <div className="text-sm font-bold">Popüler İçerik</div>
                    <p className="text-xs text-slate-500 mt-0.5">"Python ile Veri Analizi" yazısı bugün %20 daha fazla tıklandı.</p>
                 </div>
              </div>

              <div className="pt-6 border-t border-slate-700">
                 <div className="bg-slate-900 p-4 rounded-2xl text-center">
                    <div className="text-2xl font-bold text-white">26</div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Eskişehir Trafik Kodu</div>
                 </div>
              </div>
           </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
