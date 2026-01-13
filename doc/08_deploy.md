# 🚀 08_deploy.md - "Canlıya nasıl alırız?"

## 📦 Hazırlık
1. `npm run build` komutu ile projenin üretim sürümü alınır.
2. `index.html` dosyasındaki yolların doğru olduğundan emin olunur.

## 🌐 Dağıtım Kanalları
- **GitHub Pages:** Proje `HashRouter` kullandığı için sorunsuz çalışır.
- **Vercel / Netlify:** Klasör yapısı root (kök) dizinde olduğu için otomatik dağıtıma uygundur.

## 🔄 Güncelleme Akışı
- Değişiklikler önce local'de test edilir.
- `doc/10_change_log.md` güncellenir.
- Yeni sürüm `git push` ile ana dala gönderilir.
