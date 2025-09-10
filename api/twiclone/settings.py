from pathlib import Path
import os
from datetime import timedelta

BASE_DIR = Path(__file__).resolve().parent.parent

# Usa a mesma chave fictícia/local ou a de ambiente, se existir
SECRET_KEY = os.environ.get(
    "SECRET_KEY",
    "GLtHnY8KvqPsndDT6M7wBjj4K-NFNInUuHFmd3Ae0hGnbtBHh6Zl3L4W72ULdrR_DFGkSTTrHob_a4OpUCKgBw",
)

DEBUG = False

ALLOWED_HOSTS = [
    "josezaltar.pythonanywhere.com",
    ".pythonanywhere.com",
    "localhost",
    "127.0.0.1",
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "corsheaders",
    "social",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "twiclone.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "twiclone.wsgi.application"

# SQLite no PythonAnywhere
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

LANGUAGE_CODE = "pt-br"
TIME_ZONE = "America/Sao_Paulo"
USE_I18N = True
USE_TZ = True

# Static/Media (WhiteNoise)
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage"
    },
}
MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

# CORS / CSRF (frontend na Netlify)
CORS_ALLOWED_ORIGINS = [
    "https://twiiclone.netlify.app",
    "http://localhost:3000",
]
CSRF_TRUSTED_ORIGINS = [
    "https://twiiclone.netlify.app",
    "https://josezaltar.pythonanywhere.com",
    "http://localhost:3000",
]
CORS_ALLOW_CREDENTIALS = (
    True  # para cookies; não é necessário para JWT, mas não atrapalha
)

# DRF + JWT
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=12),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
    # >>> ajustes críticos para o 401 de token inválido <<<
    "AUTH_HEADER_TYPES": ("Bearer",),  # espera "Authorization: Bearer <token>"
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,  # usa a mesma SECRET_KEY para assinar/validar
}

# Segurança (HTTPS)
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
