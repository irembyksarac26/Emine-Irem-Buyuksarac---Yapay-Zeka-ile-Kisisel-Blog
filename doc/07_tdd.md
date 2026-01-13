# 🔴🟢🔵 07_tdd.md - "Önce test, sonra kod"

## 🔄 TDD Döngüsü
1. **Kırmızı (Fail):** Önce Controller'da henüz var olmayan bir fonksiyon için View'da çağrı yapılır.
2. **Yeşil (Pass):** Controller ve Service'de bu fonksiyonun minimum çalışan hali yazılır.
3. **Refactor:** Kod optimize edilir, SRP kurallarına göre parçalanır.

## 💡 Örnek: "Silme Butonu" Geliştirme Akışı
- **Step 1:** View'da "Sil" butonu eklenir ve `handleDelete` çağrılır (Hata verir).
- **Step 2:** Controller'da `handleDelete` tanımlanır, Service'e yönlendirilir.
- **Step 3:** Service'de LocalStorage filtresi yazılır.
- **Step 4:** Controller veriyi tazeler ve test edilir.
