# 🔄 09_change_mgmt.md - "Değişiklikleri nasıl yönetiriz?"

## 🛠️ Değişiklik Talebi Akışı
1. Kullanıcıdan gelen talep analiz edilir.
2. Etkilenecek katman belirlenir (Model? View? Controller?).
3. Önce **Model** güncellenir (Veri yapısı değişimi).
4. Ardından **Controller** (Mantık değişimi).
5. Son olarak **View** (Görsel değişim).

## 🚩 Versiyonlama
- **Patch (0.0.x):** Hata düzeltmeleri.
- **Minor (0.x.0):** Yeni özellik ekleme.
- **Major (x.0.0):** Mimari değişiklik.
