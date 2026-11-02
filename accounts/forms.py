from django import forms
from django.contrib.auth.forms import AuthenticationForm


class LoginForm(AuthenticationForm):
    """Django'nun hazır doğrulama formu, Türkçe mesajlar ve arayüz sınıflarıyla."""

    error_messages = {
        "invalid_login": "Kullanıcı adı veya parola hatalı. Lütfen tekrar deneyin.",
        "inactive": "Bu hesap devre dışı bırakılmış.",
    }

    username = forms.CharField(
        label="Kullanıcı adı",
        widget=forms.TextInput(
            attrs={
                "class": "field-input",
                "placeholder": "kullanici.adi",
                "autocomplete": "username",
                "autofocus": True,
                "id": "id_username",
            }
        ),
    )
    password = forms.CharField(
        label="Parola",
        strip=False,
        widget=forms.PasswordInput(
            attrs={
                "class": "field-input has-toggle",
                "placeholder": "••••••••",
                "autocomplete": "current-password",
                "id": "id_password",
            }
        ),
    )
