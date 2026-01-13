
import React from 'react';
import { useContactController } from '../controllers/useContactController';

const Contact: React.FC = () => {
  const { social, theme, formData, handleInputChange, handleSubmit } = useContactController();

  return (
    <div className="pt-12 pb-20">
      <h1 className="serif text-3xl font-medium mb-6">İletişime Geçin</h1>
      <p className="text-lg text-gray-600 mb-12 max-w-lg leading-relaxed">
        İş birlikleri, projeler veya sadece kahve içip teknoloji konuşmak için bana aşağıdaki kanallardan ulaşabilirsiniz.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a 
          href={`mailto:${social.email}`} 
          className="p-6 bg-white border border-purple-100 rounded-2xl hover:border-purple-300 transition-all hover:shadow-lg flex items-center gap-4 group"
        >
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
          </div>
          <div>
            <div className="text-xs text-purple-400 uppercase font-bold tracking-wider mb-0.5">E-posta</div>
            <div className="font-medium">{social.email}</div>
          </div>
        </a>

        <a 
          href={social.linkedin} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-6 bg-white border border-purple-100 rounded-2xl hover:border-purple-300 transition-all hover:shadow-lg flex items-center gap-4 group"
        >
          <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-xl flex items-center justify-center group-hover:bg-purple-700 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </div>
          <div>
            <div className="text-xs text-purple-400 uppercase font-bold tracking-wider mb-0.5">LinkedIn</div>
            <div className="font-medium">LinkedIn Profilim</div>
          </div>
        </a>

        <a 
          href={social.github} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-6 bg-white border border-purple-100 rounded-2xl hover:border-purple-300 transition-all hover:shadow-lg flex items-center gap-4 group"
        >
          <div className="w-12 h-12 bg-yellow-50 text-yellow-700 rounded-xl flex items-center justify-center group-hover:bg-yellow-500 group-hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </div>
          <div>
            <div className="text-xs text-yellow-600 uppercase font-bold tracking-wider mb-0.5">GitHub</div>
            <div className="font-medium">GitHub Hesabım</div>
          </div>
        </a>
      </div>

      <div className="mt-16 bg-white border border-purple-100 p-8 md:p-10 rounded-3xl shadow-sm">
        <h2 className="serif text-2xl font-medium mb-6 flex items-center gap-3">
          <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
          Bir mesaj bırakın
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Adınız" 
              className="bg-purple-50/50 px-4 py-3 rounded-xl border-none ring-1 ring-purple-100 focus:ring-2 focus:ring-purple-500 outline-none w-full transition-all" 
            />
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="E-posta" 
              className="bg-purple-50/50 px-4 py-3 rounded-xl border-none ring-1 ring-purple-100 focus:ring-2 focus:ring-purple-500 outline-none w-full transition-all" 
            />
          </div>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Mesajınız" 
            rows={4} 
            className="bg-purple-50/50 px-4 py-3 rounded-xl border-none ring-1 ring-purple-100 focus:ring-2 focus:ring-purple-500 outline-none w-full transition-all"
          ></textarea>
          <button 
            type="submit"
            className="text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all shadow-lg active:scale-95"
            style={{ background: theme.gradients.accent }}
          >
            Gönder
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
