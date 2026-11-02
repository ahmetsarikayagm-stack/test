#!/usr/bin/env python3
"""Django'nun komut satırı yardımcısı."""
import os
import sys


def main():
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Django yüklü görünmüyor. `pip install -r requirements.txt` komutunu çalıştırın."
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
