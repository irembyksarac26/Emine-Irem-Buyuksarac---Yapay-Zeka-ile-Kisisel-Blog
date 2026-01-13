
import React from 'react';
import { useAdminController } from '../../controllers/useAdminController';

const AdminSubscribers: React.FC = () => {
  const { subscribers, handleRemoveSubscriber } = useAdminController();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Abone Listesi</h2>
      
      <div className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl">
        {subscribers.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            Henüz hiç abone yok.
          </div>
        ) : (
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-700/50 text-slate-400 text-sm uppercase tracking-wider">
                <th className="px-6 py-4 font-bold">E-Posta Adresi</th>
                <th className="px-6 py-4 font-bold">Kayıt Tarihi</th>
                <th className="px-6 py-4 font-bold text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {subscribers.map((email, idx) => (
                <tr key={email} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-200">{email}</td>
                  <td className="px-6 py-4 text-slate-400 text-sm italic">Simüle Edilen Tarih</td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleRemoveSubscriber(email)}
                      className="text-red-400 hover:text-red-300 font-bold text-sm px-4 py-2 border border-red-400/20 rounded-xl hover:bg-red-400/10 transition-all"
                    >
                      Kaldır
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminSubscribers;
