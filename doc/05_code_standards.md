# ⚖️ 05_code_standards.md - "Kalite kriterleri ne?"

## 🧼 Temiz Kod Kuralları
1. **Single Responsibility (SRP):** Her fonksiyon veya bileşen sadece bir iş yapmalı. Örneğin; `handleDelete` sadece silme akışını yönetmeli, görseli güncellenmemeli (State güncellemesi View'ı tetikler).
2. **Naming:** Değişkenler `camelCase`, bileşenler `PascalCase`.
3. **DRY (Don't Repeat Yourself):** Tekrarlanan mantıklar Service katmanına taşınmalı.

## ⚛️ React Standartları
- State yönetimi için `useState` ve `useCallback` tercih edilir.
- Ağır işlemler (Arama/Filtreleme) Controller seviyesinde çözülür.
- Tailwind class'ları okunabilirlik için grup halinde yazılır.
