from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management import call_command
from django.test import TestCase
from django.urls import reverse


class LoginFlowTests(TestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(
            username="demo", password="Demo1234!"
        )
        self.login_url = reverse("accounts:login")

    def test_sqlite_kullaniliyor(self):
        self.assertEqual(
            settings.DATABASES["default"]["ENGINE"], "django.db.backends.sqlite3"
        )
        # Test koşucusu NAME'i geçici bellek veritabanıyla değiştirdiği için
        # kalıcı dosya yolunu ayar kaynağından doğrula.
        kaynak = (settings.BASE_DIR / "config" / "settings.py").read_text(
            encoding="utf-8"
        )
        self.assertIn('BASE_DIR / "db.sqlite3"', kaynak)

    def test_giris_sayfasi_aciliyor(self):
        response = self.client.get(self.login_url)
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Hesabınıza giriş yapın")
        self.assertContains(response, "csrfmiddlewaretoken")
        self.assertContains(response, "Demo1234!")
        self.assertNotContains(response, "Kayıt ol")

    def test_ana_sayfa_giris_zorunlu(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 302)
        self.assertIn(self.login_url, response["Location"])

    def test_hatali_parola(self):
        response = self.client.post(
            self.login_url, {"username": "demo", "password": "yanlis"}
        )
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "Kullanıcı adı veya parola hatalı")
        self.assertFalse(response.wsgi_request.user.is_authenticated)

    def test_dogru_giris_ve_ana_sayfa(self):
        response = self.client.post(
            self.login_url,
            {"username": "demo", "password": "Demo1234!", "remember_me": "on"},
        )
        self.assertRedirects(response, "/")
        page = self.client.get("/")
        self.assertContains(page, "Giriş başarılı")
        self.assertContains(page, "demo")

    def test_beni_hatirla_oturum_suresi(self):
        self.client.post(self.login_url, {"username": "demo", "password": "Demo1234!"})
        self.assertTrue(self.client.session.get_expire_at_browser_close())

        self.client.post(reverse("accounts:logout"))
        self.client.post(
            self.login_url,
            {"username": "demo", "password": "Demo1234!", "remember_me": "on"},
        )
        self.assertFalse(self.client.session.get_expire_at_browser_close())

    def test_giris_yapmis_kullanici_forma_yonlendirilir(self):
        self.client.force_login(self.user)
        response = self.client.get(self.login_url)
        self.assertRedirects(response, "/")

    def test_cikis(self):
        self.client.force_login(self.user)
        response = self.client.post(reverse("accounts:logout"))
        self.assertRedirects(response, self.login_url)
        self.assertEqual(self.client.get("/").status_code, 302)

    def test_seed_demo_komutu(self):
        call_command("seed_demo", username="deneme", password="Deneme123!", verbosity=0)
        user = get_user_model().objects.get(username="deneme")
        self.assertTrue(user.check_password("Deneme123!"))
        self.assertTrue(
            self.client.login(username="deneme", password="Deneme123!")
        )
