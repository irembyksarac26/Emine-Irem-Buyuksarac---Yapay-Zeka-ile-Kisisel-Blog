# 🏗️ 04_plan_design.md - "Nasıl bir mimari?"

## 🏛️ MVC Katmanları
1. **Model (`/models`, `/services`):** Verinin yapısını tanımlar ve ham veriye (LocalStorage) erişimi yönetir.
2. **Controller (`/controllers`):** View'dan gelen istekleri karşılar, Service katmanını çağırır ve durumu (state) günceller.
3. **View (`/pages`, `/components`):** Sadece veriyi görselleştirir. Hiçbir iş mantığı içermez, sadece Controller'dan gelen verileri "render" eder.

## 📁 Dosya Organizasyonu (SRP Odaklı)
- `services/`: Veri manipülasyonu (Single Source of Truth).
- `controllers/`: Görünüm mantığı (Logic isolation).
- `pages/`: Sayfa bazlı bileşenler.
- `components/`: Tekrar kullanılabilir UI parçaları.
