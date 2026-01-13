# 📜 10_change_log.md - "Yapılan Değişiklikler"

## [v1.1.0] - 2024-03-20
### ✨ Eklenenler
- Admin panelindeki yazı listesine **Arama (Search)** özelliği eklendi.
- Yazı listesi tablosu modern kategori ve tarih sütunlarıyla güncellendi.
- Yazı silme işlemi için onay (Confirm) popup'ı eklendi.

### 🛠️ Düzeltmeler
- Admin panelinde silme butonunun state'i güncellememesi sorunu `loadData` senkronizasyonu ile çözüldü.
- Silinen yazıya ait beğeni ve kayıt verilerinin temizlenmesi sağlandı.

### 🏗️ Mimari Güncellemeler
- Proje tamamen **MVC (Model-View-Controller)** yapısına taşındı.
- İş mantığı `controllers/` klasöründeki Custom Hook'lara izole edildi.
- Dokümantasyon sistemi (`doc/`) sıfırdan oluşturuldu.

---
*Emine İrem Büyüksaraç Blog Engine v1.1*
