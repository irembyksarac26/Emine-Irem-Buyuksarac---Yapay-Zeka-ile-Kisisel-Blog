
import React from 'react';
import { useSavedPostsController } from '../controllers/useSavedPostsController';

const SavedPosts: React.FC = () => {
  const { savedPosts, theme, handleRemove } = useSavedPostsController();

  return (
    <div className="pt-12 pb-20 animate-in fade-in duration-500">
      <div className="max-w-screen-md mx-auto px-6">
        <header className="mb-12">
          <h1 className="serif text-4xl font-bold text-gray-900 dark:text-white mb-4">Kaydedilenler</h1>
          <p className="text-gray-500 dark:text-slate-400">
            Daha sonra okumak üzere kaydettiğiniz yazılar burada listelenir.
          </p>
        </header>

        {savedPosts.length === 0 ? (
          <div className="bg-purple-50 dark:bg-slate-800/50 rounded-3xl p-12 text-center border border-dashed border-purple-200 dark:border-slate-700">
            <span className="text-6xl mb-4 block">🔖</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Henüz Kaydedilen Yazı Yok</h2>
            <p className="text-gray-500 dark:text-slate-400 mb-8">
              Beğendiğiniz yazıları ana sayfadaki 🔖 butonuna tıklayarak buraya ekleyebilirsiniz.
            </p>
            <a href="#/" className="inline-block bg-purple-600 text-white font-bold px-8 py-3 rounded-2xl shadow-lg hover:bg-purple-700 transition-all">
              Yazıları Keşfet
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {savedPosts.map((post) => (
              <div 
                key={post.id} 
                className="group bg-white dark:bg-slate-800 rounded-3xl p-6 border border-gray-100 dark:border-slate-700 flex flex-col sm:flex-row gap-6 hover:shadow-xl transition-all"
              >
                <div className="sm:w-48 h-32 flex-shrink-0 overflow-hidden rounded-2xl">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-duration-500" />
                </div>
                
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="serif text-xl font-bold text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                      {post.title}
                    </h3>
                    <button 
                      onClick={() => handleRemove(post.id)}
                      className="text-purple-600 hover:text-red-500 transition-colors p-1"
                      title="Kaldır"
                    >
                      <span className="text-xl">🔖</span>
                    </button>
                  </div>
                  <p className="text-gray-500 dark:text-slate-400 text-sm line-clamp-2 mb-4">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedPosts;
