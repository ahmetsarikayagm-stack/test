from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Giriş ekranını denemek için demo kullanıcı oluşturur (varsa parolasını yeniler)."

    def add_arguments(self, parser):
        parser.add_argument("--username", default="demo")
        parser.add_argument("--password", default="Demo1234!")

    def handle(self, *args, **options):
        User = get_user_model()
        username = options["username"]
        password = options["password"]

        user, created = User.objects.get_or_create(
            username=username, defaults={"is_active": True}
        )
        user.set_password(password)
        user.is_active = True
        user.save(update_fields=["password", "is_active"])

        action = "oluşturuldu" if created else "güncellendi"
        self.stdout.write(
            self.style.SUCCESS(
                f"Demo kullanıcı {action}: {username} / {password}  (SQLite: db.sqlite3)"
            )
        )
