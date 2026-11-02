# Liva Atölye — Giriş Ekranı (Django + SQLite)

Önceki statik mağaza kaldırıldı; proje **Django 5.2** ile, **yalnızca giriş (login) akışı** olacak şekilde yeniden tasarlandı. Kullanıcı verileri varsayılan **SQLite** veritabanında (`db.sqlite3`) ve Django'nun yerleşik `auth` / `sessions` uygulamalarında tutulur.

> Kayıt olma, şifre sıfırlama, ürün veya sipariş ekranı **yoktur**: `/login/` → giriş, `/` → giriş sonrası kısa doğrulama ekranı, `/logout/` → çıkış.

## Kurulum ve çalıştırma

```bash
pip install -r requirements.txt
python manage.py migrate                # SQLite tablolarını oluşturur
python manage.py seed_demo              # demo kullanıcıyı ekler
python manage.py runserver 0.0.0.0:3000
```

Ardından `http://localhost:3000/login/` adresini açın.

**Demo hesap:** `demo` / `Demo1234!` (giriş ekranındaki "Doldur" butonu alanları otomatik doldurur).

Kullanıcı adı/parolayı değiştirmek isterseniz:

```bash
python manage.py seed_demo --username admin --password YeniParola123!
```

## Testler

```bash
python manage.py test
```

SQLite kullanımı, giriş sayfası, hatalı/doğru parola, "beni hatırla" oturum süresi, giriş zorunluluğu, çıkış ve `seed_demo` komutu test edilir.

## URL'ler

| Adres | Açıklama |
| --- | --- |
| `/login/` | Giriş formu (`LoginView` + özel `LoginForm`) |
| `/` | Giriş yapmış kullanıcı için "Giriş başarılı" ekranı; misafir `/login/`'e yönlenir |
| `/logout/` | Yalnızca `POST` ile çıkış |

## Dosya yapısı

```
manage.py
requirements.txt
config/          settings.py (SQLite, auth, güvenlik), urls.py, wsgi.py, asgi.py
accounts/
  forms.py       Türkçe doğrulama mesajları + alan sınıfları
  views.py       LoginView (beni hatırla) ve giriş sonrası home
  urls.py        login / logout / home
  tests.py       akış testleri
  management/commands/seed_demo.py
  templates/accounts/  login.html, home.html
  static/accounts/     css/style.css, js/login.js, img/login-panel.webp
templates/base.html    ortak iskelet + SVG ikon spriteları
```

## Notlar

- `db.sqlite3` ve `__pycache__` Git'e eklenmez; her klonda `migrate` + `seed_demo` çalıştırın.
- Üretim/demo dışı kullanım için `DJANGO_SECRET_KEY`, `DJANGO_DEBUG=0` ve `DJANGO_ALLOWED_HOSTS` ortam değişkenlerini ayarlayın. Önizleme sunucuları için `DJANGO_CSRF_ORIGINS` varsayılan olarak `https://*.e2b.app` içerir.
- `SECRET_KEY` dosyadaki hâli yalnızca geliştirme içindir.
- "Beni hatırla" seçilmezse oturum tarayıcı kapanınca biter; seçilirse 14 gün geçerlidir.
