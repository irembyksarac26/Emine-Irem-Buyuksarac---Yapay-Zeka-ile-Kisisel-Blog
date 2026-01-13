
# 📖 useAdminController.ts - Kod Okuma Rehberi

## 🎯 Giriş
*Bu dosya ne işe yarıyor?*
Yönetim panelinin (Admin Panel) tüm mantıksal süreçlerini koordine eden "beyin" katmanıdır. Veritabanı (LocalStorage) ile arayüz (View) arasındaki veri akışını yönetir, yetkilendirme kontrollerini yapar ve kullanıcı eylemlerini (silme, arama, çıkış) işler.

*Hangi dosyalarla bağlantılı?*
- **Kullanıyor:** `AdminService` (Giriş kontrolü), `BlogService` (Yazı işlemleri), `InteractionService` (İstatistikler ve aboneler).
- **Kullanan:** `AdminLayout`, `AdminDashboard`, `AdminPosts` ve `AdminSubscribers` bileşenleri bu kontrolcüden gelen verileri görüntüler.

---

## 🏗️ Gerçek Hayat Karşılığı: Restoran Garsonu Analojisi
Müşteri (Arayüz/Kullanıcı) masaya oturduğunda (Sayfa açıldığında), garson (Controller) gelir:
1.  Müşterinin mekana girmeye yetkisi var mı kontrol eder (Login Check).
2.  Mutfağa (Model/Service) gider, güncel menüyü ve stok durumunu alır (loadData).
3.  Müşteri "bu yemeği iptal et" dediğinde (handleDeletePost), garson mutfağa bu emri iletir ve menü listesini güncelleyerek müşteriye yeni haliyle sunar.
4.  Garson mutfaktaki aşçı değildir; sadece siparişi (veriyi) doğru yere iletmekten sorumludur.

---

## 🎵 Spotify Analojisi: Çalma Listesi Yöneticisi
Spotify uygulamasındaki "Çalma Listelerim" ekranını düşünün:
1.  **Görünüm (View):** Ekranda gördüğünüz şarkı listesi ve "Kaldır" butonu.
2.  **Controller (Bu Dosya):** Siz bir şarkıyı sil butonuna bastığınızda, bu dosya devreye girer. Spotify sunucusuna (Model) "bu şarkıyı listeden çıkar" der.
3.  **Senkronizasyon:** Şarkı sunucudan silindiği an, Controller ekranınızdaki listeyi de anında günceller. Eğer bu dosya (Controller) olmasaydı, şarkı sunucudan silinse bile siz sayfayı yenileyene kadar ekranda görmeye devam ederdiniz.
4.  **Arama:** Üstteki arama çubuğuna yazdığınızda, kütüphanenizdeki yüzlerce şarkı arasından sadece eşleşenleri size süzerek getiren mekanizma yine bu kontrolcüdür.

---

## ⚖️ Tasarım Prensipleri (MVC & SRP)
- **MVC (Model-View-Controller):** Bu dosya tam olarak "C" (Controller) görevini görür. Görsel tasarıma (CSS/HTML) karışmaz, veri saklama detaylarını (LocalStorage) bilmez. Sadece aradaki trafiği yönetir.
- **SRP (Single Responsibility):** Bu kontrolcü sadece "Yönetici Paneli Veri Akışı"ndan sorumludur. Hakkımda sayfası veya Kaydedilenler sayfası gibi admin dışı alanlara asla müdahale etmez.
