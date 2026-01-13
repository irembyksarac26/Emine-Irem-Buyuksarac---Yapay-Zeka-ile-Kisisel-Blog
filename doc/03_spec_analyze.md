# 🔍 03_spec_analyze.md - "Teknik gereksinimler neler?"

## 🛠️ Teknoloji Yığını
- **Core:** React 19 + TypeScript.
- **Styling:** Tailwind CSS (Utility-first).
- **Routing:** React Router DOM (HashRouter - Kolay dağıtım için).
- **State Management:** Custom Hooks (Controller Pattern).
- **Persistence:** Browser LocalStorage.

## 📊 Veri Analizi (Model)
- **Post:** ID, Başlık, Özet, İçerik, Tarih, Kategori, Kapak Fotoğrafı.
- **User:** Ad, Meslek, Uzmanlıklar, İletişim Bilgileri.
- **Stats:** Beğeni sayıları ve abone e-postaları.

## 🛡️ Güvenlik Analizi
- Admin paneli istemci taraflı oturum kontrolü ile korunur.
- Kritik veriler (Admin şifresi) `AdminService` içinde SRP kuralına göre izole edilmiştir.
