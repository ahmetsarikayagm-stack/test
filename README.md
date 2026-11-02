# Liva Atölye — Basit Satıcı Web Sitesi

El yapımı ev eşyaları satan kurgusal bir satıcı (butik atölye) için **bağımlılıksız, statik** bir mağaza sitesi. Sadece HTML, CSS ve vanilla JavaScript kullanır; build adımı, framework veya veritabanı gerektirmez.

## Çalıştırma

Depoyu klonladıktan sonra kök dizinde herhangi bir statik sunucu yeterlidir:

```bash
python3 -m http.server 3000
# ardından http://localhost:3000 adresini açın
```

Alternatif olarak `index.html` dosyasını doğrudan tarayıcıda açabilirsiniz (sepet/favoriler için `localStorage` dosya şemasında da genellikle çalışır).

## Özellikler

- **Ürün vitrini**: 6 ürün, kategori filtreleri, metin araması, fiyat/puan sıralama, favoriler
- **Ürün detayı**: görsel, açıklama, özellik listesi, adet seçimi ve sepete ekleme (modal)
- **Sepet**: adet artırma/azaltma, ürün çıkarma, ara toplam, 750 ₺ üzeri ücretsiz kargo göstergesi, `localStorage` ile kalıcılık
- **Satıcı profili**: hikâye, konum, puan ve doğrulanmış satıcı bilgileri
- **İletişim**: bilgi kartları ve demo form (veri göndermez, bildirim gösterir)
- ** responsive tasarım**, klavye ile kullanım (ESC ile kapatma), `aria` etiketleri, hareket azaltma tercihi desteği

> **Not:** Ödeme, sipariş ve form gönderimi demo amaçlıdır; gerçek bir backend veya ödeme altyapısı bağlı değildir. Ürün/fiyat bilgileri `js/app.js` içindeki `PRODUCTS` dizisinden, görseller `assets/` klasöründen değiştirilebilir.

## Dosya yapısı

```
index.html                # Sayfa iskeleti ve ikon sprite'ları
css/styles.css            # Tüm stiller ve responsive kurallar
js/app.js                 # Ürün verisi, filtreleme, sepet, modal, form
assets/products/*.webp    # Ürün fotoğrafları
assets/products/*.svg     # Ürün illüstrasyonları
```

## Özelleştirme

- Ürün eklemek/çıkarmak için `PRODUCTS` dizisini düzenleyin; kategori filtreleri diziden otomatik üretilir.
- Renk paleti `css/styles.css` dosyasının başındaki `:root` değişkenlerinde.
- Ücretsiz kargo limiti `js/app.js` içindeki `FREE_SHIPPING` sabitinde.
- Satıcı adı, iletişim bilgileri ve metinler `index.html` içinde.
