from django.conf import settings
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

from .forms import LoginForm


class LoginView(auth_views.LoginView):
    """Sadece giriş: hazır LoginView üzerine Türkçe form ve 'beni hatırla' eklendi."""

    template_name = "accounts/login.html"
    authentication_form = LoginForm
    redirect_authenticated_user = True
    extra_context = {
        "demo_username": "demo",
        "demo_password": "Demo1234!",
    }

    def form_valid(self, form):
        response = super().form_valid(form)
        # Django oturumu açtıktan sonra süreyi ayarla; seçilmezse tarayıcı kapanınca biter.
        if self.request.POST.get("remember_me") != "on":
            self.request.session.set_expiry(0)
        else:
            self.request.session.set_expiry(settings.SESSION_COOKIE_AGE)
        return response


class LogoutView(auth_views.LogoutView):
    """Django 5.x'te çıkış yalnızca POST ile yapılır; GET kabul edilmez."""


@login_required
def home(request):
    """Giriş sonrası minimal doğrulama ekranı (ek sayfa/özellik yok)."""
    return render(request, "accounts/home.html")
