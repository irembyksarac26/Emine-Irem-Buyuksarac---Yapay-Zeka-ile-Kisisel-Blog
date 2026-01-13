
import React from 'react';
import { useAboutController } from '../controllers/useAboutController';

const About: React.FC = () => {
  const { user, theme, dimensions } = useAboutController();

  return (
    <div className="pt-12 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div 
        className="relative overflow-hidden rounded-3xl mb-12 p-8 md:p-12 text-white shadow-2xl"
        style={{ background: theme.gradients.accent, boxShadow: theme.shadows.card }}
      >
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-purple-400 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div 
              className="relative bg-white rounded-full flex-shrink-0 flex items-center justify-center border-4 border-white/20 shadow-lg overflow-hidden transition-transform duration-500 hover:scale-105"
              style={{ width: dimensions.profilePhotoSize, height: dimensions.profilePhotoSize }}
            >
              <img 
                src="https://picsum.photos/seed/irem/400/400" 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="text-center md:text-left flex-1 py-2">
            <h1 className="serif text-4xl font-semibold mb-2 tracking-tight">{user.name}</h1>
            <p className="text-purple-200 font-semibold text-lg mb-6 flex items-center justify-center md:justify-start gap-2">
              <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
              {user.role} • {user.city}
            </p>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {user.specialties.map((skill) => (
                <span 
                  key={skill} 
                  className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm rounded-full font-medium shadow-sm transition-all duration-300 hover:bg-yellow-400 hover:text-purple-900 hover:border-yellow-400 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-yellow-200 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="grid grid-cols-1 gap-10 max-w-3xl mx-auto">
        <section 
          className="bg-white p-8 md:p-10 rounded-3xl border border-purple-50 transition-all duration-500 hover:shadow-2xl"
          style={{ boxShadow: theme.shadows.card }}
        >
          <h2 className="serif text-3xl font-medium mb-6 flex items-center gap-3 text-slate-900">
            <span className="w-8 h-1 bg-purple-500 rounded-full"></span>
            Hakkımda
          </h2>
          <div className="relative mb-8">
            <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400 rounded-full"></div>
            <p className="pl-6 text-slate-700 leading-relaxed text-xl italic font-light">
              "{user.bio}"
            </p>
          </div>
          
          <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
            <p>
              Eskişehir merkezli bir <span className="text-purple-600 font-semibold">{user.role}</span> olarak, teknolojinin hem yaratıcı hem de koruyucu tarafıyla ilgileniyorum. 
              Bilgi Güvenliği ve <strong className="text-slate-900">Yapay Zeka</strong> alanlarındaki uzmanlığımı pratik yazılım çözümleriyle birleştirmek en büyük tutkum.
            </p>
            <p>
              Yönetim Bilişim Sistemleri (MIS) altyapım sayesinde sadece kod yazmaya değil, bu kodun iş dünyasındaki karşılığına ve güvenliğine de odaklanıyorum.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <p className="text-slate-500 font-medium">Yeni fırsatlar için hazırım.</p>
            <button 
              className="group relative overflow-hidden text-white px-8 py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              style={{ background: theme.gradients.accent }}
            >
              <span className="relative z-10">CV'mi Görüntüle</span>
              <div className="absolute inset-0 bg-yellow-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
