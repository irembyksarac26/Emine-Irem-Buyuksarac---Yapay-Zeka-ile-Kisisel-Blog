
import React, { useState } from 'react';
import { useHomeController } from '../controllers/useHomeController';

interface HomeProps {
  overridePostId?: number;
}

const Home: React.FC<HomeProps> = ({ overridePostId }) => {
  const { post, relatedPosts, dimensions, interactions, subscription, scrollProgress, lastRead, scrollToContent } = useHomeController(overridePostId);
  const [localBookmarks, setLocalBookmarks] = useState<Record<number, boolean>>({});

  const toggleLocalBookmark = (p: any) => {
    interactions.handleBookmarkOther(p);
    setLocalBookmarks(prev => ({
      ...prev,
      [p.id]: !p.isBookmarked
    }));
  };

  return (
    <div className="w-full transition-all duration-300">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-transparent pointer-events-none">
        <div 
          className="h-full bg-purple-600 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(147,51,234,0.5)]" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Continue Reading Banner */}
      {lastRead && !overridePostId && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[55] w-full max-w-screen-md px-6 animate-in slide-in-from-top-10 duration-500">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-purple-100 dark:border-purple-900/30 p-4 rounded-2xl shadow-xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="flex-shrink-0 text-xl">📖</span>
              <p className="text-sm font-medium text-gray-700 dark:text-slate-200 truncate">
                Kaldığınız yer: <span className="font-bold text-purple-600 dark:text-purple-400">"{lastRead.title}"</span>
              </p>
            </div>
            <button 
              onClick={scrollToContent}
              className="flex-shrink-0 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-md transition-all active:scale-95"
            >
              Okumaya Devam Et
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] transition-all duration-300 transform ${
        interactions.showToast ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
      }`}>
        <div className="bg-gray-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 font-medium">
          <span className="text-green-400 font-bold">✓</span>
          Bağlantı başarıyla kopyalandı!
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative w-full overflow-hidden" style={{ height: dimensions.heroHeight }}>
        <img 
          src={post.heroImage} 
          alt={post.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-screen-md w-full px-6 text-center">
            <h1 className="serif font-bold text-white leading-tight mb-4 drop-shadow-lg" style={{ fontSize: '42px' }}>
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-200 font-medium">
              <span>📅 {post.date}</span>
              <span>•</span>
              <span>⏱️ {post.readTime}</span>
            </div>
          </div>
        </div>
        
        {/* Floating Save Button for Featured Post */}
        <button 
          onClick={interactions.handleBookmark}
          className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md transition-all duration-300 transform hover:scale-110 active:scale-90 shadow-lg ${
            interactions.isBookmarked 
              ? 'bg-purple-600 text-white' 
              : 'bg-white/20 text-white border border-white/30 hover:bg-white/40'
          }`}
          title={interactions.isBookmarked ? "Kaydedilenlerden Kaldır" : "Yazıyı Kaydet"}
        >
          <span className="text-xl">{interactions.isBookmarked ? '🔖' : '🔖'}</span>
        </button>
      </div>

      <div className="max-w-screen-md mx-auto px-6 relative z-10">
        <article className="pt-12">
          {/* Intro */}
          <header className="mb-12" style={{ maxWidth: dimensions.blogMaxWidth, margin: '0 auto' }}>
            <p className="text-xl leading-[1.8] text-gray-600 dark:text-slate-400 serif italic border-l-4 border-purple-500 pl-6">
              {post.intro}
            </p>
          </header>

          {/* Content */}
          <div 
            className="serif text-gray-800 dark:text-slate-200 leading-[1.8] text-lg space-y-10" 
            style={{ maxWidth: dimensions.blogMaxWidth, margin: '0 auto' }}
          >
            {post.sections.map((section, idx) => (
              <React.Fragment key={idx}>
                <section className="space-y-4">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white serif mt-12 mb-4">
                    {section.heading}
                  </h2>
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="mb-4">{paragraph}</p>
                  ))}
                </section>
                {idx === 0 && post.quote && (
                  <blockquote className="my-16 p-10 bg-purple-50 dark:bg-slate-800/50 rounded-2xl border-l-8 border-purple-500 shadow-sm transition-all">
                    <p className="text-2xl italic leading-relaxed text-purple-900 dark:text-purple-300 font-medium serif">
                      "{post.quote}"
                    </p>
                  </blockquote>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Feature 1: Like & Bookmark System */}
          <section 
            className="mt-16 flex items-center justify-between py-6 border-t border-gray-100 dark:border-slate-800"
            style={{ maxWidth: dimensions.blogMaxWidth, margin: '64px auto 0' }}
          >
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400 font-semibold">
                <span className={`text-xl transition-transform ${interactions.isAnimate ? 'animate-heart-pulse' : ''}`}>
                  ❤️
                </span>
                <span>{interactions.likes} Beğeni</span>
              </div>
              <button 
                onClick={interactions.handleBookmark}
                className={`flex items-center gap-2 font-semibold transition-all ${
                  interactions.isBookmarked ? 'text-purple-600' : 'text-gray-400 hover:text-purple-500'
                }`}
              >
                <span className="text-xl">🔖</span>
                <span>{interactions.isBookmarked ? 'Kaydedildi' : 'Kaydet'}</span>
              </button>
            </div>
            
            <button 
              onClick={interactions.handleLike}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all duration-300 ${
                interactions.isLiked 
                  ? 'bg-red-50 text-red-500 border border-red-200 cursor-default' 
                  : 'bg-gray-100 dark:bg-slate-800 hover:bg-red-50 hover:text-red-500'
              }`}
            >
              <span className={`text-lg transition-transform ${interactions.isAnimate ? 'animate-heart-pulse' : ''}`}>
                {interactions.isLiked ? '❤️' : '🤍'}
              </span>
              <span>{interactions.isLiked ? 'Beğenildi' : 'Beğen'}</span>
            </button>
          </section>

          {/* Feature 2: Social Sharing Buttons */}
          <section 
            className="mt-6 flex flex-wrap items-center justify-center gap-4 pb-12 border-b border-gray-100 dark:border-slate-800"
            style={{ maxWidth: dimensions.blogMaxWidth, margin: '0 auto' }}
          >
            <span className="w-full text-center text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-2">📤 Paylaş</span>
            <button onClick={interactions.handleShareTwitter} className="flex items-center gap-2 px-5 py-2.5 bg-[#1DA1F2]/10 text-[#1DA1F2] rounded-xl font-bold hover:bg-[#1DA1F2] hover:text-white transition-all">🐦 Twitter</button>
            <button onClick={interactions.handleShareLinkedIn} className="flex items-center gap-2 px-5 py-2.5 bg-[#0077b5]/10 text-[#0077b5] rounded-xl font-bold hover:bg-[#0077b5] hover:text-white transition-all">💼 LinkedIn</button>
            <button onClick={interactions.handleCopyLink} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all transform active:scale-95 ${
              interactions.copyStatus.includes('✓') 
                ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-purple-500 hover:text-white'
            }`}>📋 {interactions.copyStatus}</button>
          </section>

          {/* Feature 3: Newsletter Subscription Form */}
          <section 
            className="mt-16 bg-slate-50 dark:bg-slate-800/30 p-10 rounded-3xl border border-gray-100 dark:border-slate-800"
            style={{ maxWidth: dimensions.blogMaxWidth, margin: '64px auto 0' }}
          >
            <div className="text-center mb-8">
              <h2 className="serif text-3xl font-bold text-gray-900 dark:text-white mb-3">📬 Bültene Abone Ol</h2>
              <p className="text-gray-500 dark:text-slate-400 max-w-sm mx-auto">
                Yeni yazılardan haberdar olmak için e-posta adresinizi bırakın.
              </p>
            </div>
            
            <form onSubmit={subscription.handleSubscribe} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-grow flex flex-col">
                  <input 
                    type="text" 
                    placeholder="E-posta adresiniz..."
                    value={subscription.email}
                    onChange={(e) => subscription.setEmail(e.target.value)}
                    className={`px-5 py-3 rounded-2xl bg-white dark:bg-slate-900 border focus:ring-2 focus:ring-purple-500 outline-none transition-all ${
                      subscription.emailError 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/10' 
                        : 'border-gray-200 dark:border-slate-700'
                    }`}
                  />
                </div>
                <button 
                  type="submit"
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-lg transition-all transform active:scale-95"
                >
                  Abone Ol
                </button>
              </div>
              
              {subscription.emailError && (
                <p className="text-red-500 text-xs font-bold mt-2 ml-1 animate-in fade-in slide-in-from-top-1">
                  ⚠️ {subscription.emailError}
                </p>
              )}

              {subscription.subMessage.text && (
                <p className={`text-center mt-4 p-3 rounded-xl font-semibold border ${
                  subscription.subMessage.type === 'success' 
                    ? 'text-green-600 bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-900/20' 
                    : 'text-red-500 bg-red-50 border-red-100 dark:bg-red-900/10 dark:border-red-900/20'
                }`}>
                  {subscription.subMessage.text}
                </p>
              )}
            </form>
            
            <div className="text-center mt-8 text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest">
              {subscription.subCount > 0 
                ? `✓ ${subscription.subCount} kişi abone oldu` 
                : "İlk abone sen ol!"}
            </div>
          </section>

          {/* Related Posts */}
          <section 
            className="mt-24 pt-12 border-t border-gray-100 dark:border-slate-800"
            style={{ maxWidth: dimensions.blogMaxWidth, margin: '96px auto 0' }}
          >
            <h2 className="serif text-2xl font-bold text-gray-900 dark:text-white mb-8">İlgili Yazılar</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedPosts.map((p) => (
                <div key={p.id} className="group relative cursor-pointer" onClick={() => window.open(`#/yazi/${p.id}`, '_self')}>
                  <div className="aspect-[16/9] overflow-hidden rounded-2xl mb-4 bg-gray-100 dark:bg-slate-800 relative">
                    <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    
                    {/* Inline Save Button for Related Post */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLocalBookmark(p);
                      }}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md shadow-md transition-all ${
                        localBookmarks[p.id] || p.isBookmarked
                          ? 'bg-purple-600 text-white' 
                          : 'bg-black/30 text-white hover:bg-black/50'
                      }`}
                    >
                      <span className="text-sm">🔖</span>
                    </button>
                  </div>
                  <h3 className="serif text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-500 transition-colors">{p.title}</h3>
                  <p className="text-gray-500 dark:text-slate-400 text-sm line-clamp-2">{p.excerpt}</p>
                </div>
              ))}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default Home;
