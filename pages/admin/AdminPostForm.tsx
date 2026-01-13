
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminPostFormController } from '../../controllers/useAdminPostFormController';

const AdminPostForm: React.FC = () => {
  const navigate = useNavigate();
  const { 
    formData, errors, isPreviewOpen, saveStatus, 
    setIsPreviewOpen, updateField, updateSectionContent, 
    handleSaveDraft, handlePublish, isEdit 
  } = useAdminPostFormController();

  const categories = ["Teknoloji", "Kariyer", "Kişisel Gelişim", "Eğitim", "Diğer"];

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">
            {isEdit ? `✏️ Yazıyı Düzenle: ${formData.title}` : '➕ Yeni Yazı Oluştur'}
          </h2>
          <p className="text-slate-500 mt-1">Blog takipçilerinle yeni fikirler paylaş.</p>
        </div>
        {saveStatus === 'saved' && (
          <span className="bg-green-500/10 text-green-400 px-4 py-2 rounded-xl text-sm font-bold animate-pulse">
            ✓ Taslak Kaydedildi
          </span>
        )}
      </header>

      <form onSubmit={handlePublish} className="space-y-8">
        {/* Ana Bilgiler */}
        <section className="bg-slate-800 p-8 rounded-[2rem] border border-slate-700 shadow-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Başlık *</label>
              <input 
                className={`w-full bg-slate-900 border ${errors.title ? 'border-red-500' : 'border-slate-700'} rounded-2xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-purple-600 transition-all font-bold`}
                value={formData.title}
                onChange={e => updateField('title', e.target.value)}
                placeholder="Örn: Python ile Veri Madenciliği"
              />
              {errors.title && <p className="text-red-500 text-xs font-bold ml-1">{errors.title}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Kategori *</label>
              <select 
                className={`w-full bg-slate-900 border ${errors.category ? 'border-red-500' : 'border-slate-700'} rounded-2xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-purple-600 transition-all appearance-none`}
                value={formData.category}
                onChange={e => updateField('category', e.target.value)}
              >
                <option value="">Seçiniz...</option>
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              {errors.category && <p className="text-red-500 text-xs font-bold ml-1">{errors.category}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Özet *</label>
              <span className={`text-[10px] font-bold ${formData.intro?.length! > 200 ? 'text-red-500' : 'text-slate-500'}`}>
                {formData.intro?.length || 0} / 200
              </span>
            </div>
            <textarea 
              rows={2}
              className={`w-full bg-slate-900 border ${errors.intro ? 'border-red-500' : 'border-slate-700'} rounded-2xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-purple-600 transition-all text-sm leading-relaxed`}
              value={formData.intro}
              onChange={e => updateField('intro', e.target.value)}
              placeholder="Ana sayfada görünecek kısa açıklama..."
            />
            {errors.intro && <p className="text-red-500 text-xs font-bold ml-1">{errors.intro}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Kapak Görseli URL</label>
            <input 
              className="w-full bg-slate-900 border border-slate-700 rounded-2xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-purple-600 transition-all"
              value={formData.heroImage}
              onChange={e => updateField('heroImage', e.target.value)}
              placeholder="https://..."
            />
          </div>
        </section>

        {/* İçerik */}
        <section className="bg-slate-800 p-8 rounded-[2rem] border border-slate-700 shadow-xl space-y-4">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">İçerik *</label>
          <textarea 
            rows={12}
            className={`w-full bg-slate-900 border ${errors.content ? 'border-red-500' : 'border-slate-700'} rounded-2xl px-5 py-4 text-white outline-none focus:ring-2 focus:ring-purple-600 transition-all leading-relaxed serif`}
            value={formData.sections?.[0]?.content.join('\n\n')}
            onChange={e => updateSectionContent(e.target.value)}
            placeholder="Yazınızın tam metni. Paragraflar için iki kez Enter'a basın..."
          />
          {errors.content && <p className="text-red-500 text-xs font-bold ml-1">{errors.content}</p>}
        </section>

        {/* Aksiyon Butonları */}
        <div className="flex flex-wrap gap-4 sticky bottom-8 bg-slate-900/80 backdrop-blur-md p-4 rounded-3xl border border-slate-700 shadow-2xl z-40">
          <button 
            type="button"
            onClick={() => setIsPreviewOpen(true)}
            className="px-8 py-4 bg-slate-800 text-slate-300 font-bold rounded-2xl hover:bg-slate-700 transition-all border border-slate-700 flex items-center gap-2"
          >
            👁️ Önizle
          </button>
          
          <div className="flex-grow flex gap-4">
            <button 
              type="button"
              onClick={() => navigate('/admin/yazilar')}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold py-4 rounded-2xl transition-all border border-slate-700"
            >
              ❌ İptal
            </button>
            <button 
              type="submit"
              className="flex-[2] bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-purple-900/20 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              {isEdit ? '💾 Değişiklikleri Kaydet' : '🚀 Yayınla'}
            </button>
          </div>

          {!isEdit && (
            <button 
              type="button"
              onClick={handleSaveDraft}
              className="px-8 py-4 bg-slate-800 text-purple-400 font-bold rounded-2xl hover:bg-slate-700 transition-all border border-purple-500/30 flex items-center gap-2"
            >
              💾 Taslak
            </button>
          )}
        </div>
      </form>

      {/* Önizleme Modalı (Aynı kaldı) */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setIsPreviewOpen(false)}></div>
          <div className="relative bg-white dark:bg-slate-900 w-full max-w-4xl max-h-full overflow-y-auto rounded-[2.5rem] shadow-2xl border border-slate-800">
            <button 
              onClick={() => setIsPreviewOpen(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors z-50"
            >
              ✕
            </button>
            
            <div className="p-8 md:p-12">
              <span className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                {formData.category || 'Kategori'}
              </span>
              <h1 className="serif text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                {formData.title || 'Yazı Başlığı'}
              </h1>
              <div className="aspect-video rounded-3xl overflow-hidden mb-10 bg-slate-800">
                <img src={formData.heroImage} alt="" className="w-full h-full object-cover" />
              </div>
              <p className="text-xl serif italic text-slate-600 dark:text-slate-400 border-l-4 border-purple-500 pl-6 mb-10">
                {formData.intro || 'Özet metni burada görünecek...'}
              </p>
              <div className="serif text-lg text-slate-800 dark:text-slate-200 leading-relaxed space-y-6">
                {formData.sections?.[0]?.content.map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPostForm;
