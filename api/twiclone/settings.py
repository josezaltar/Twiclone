from pathlib import Path
from datetime import timedelta
import os

BASE_DIR = Path(__file__).resolve().parent.parent

# ========================
# Núcleo
# ========================
# >>> COLOQUE AQUI A CHAVE FICTÍCIA QUE TE PASSEI <<<
SECRET_KEY = "GLtHnY8KvqPsndDT6M7wBjj4K-NFNInUuHFmd3Ae0hGnbtBHh6Zl3L4W72ULdrR_DFGkSTTrHob_a4OpUCKgBw"

# Produção no PythonAnywhere
DEBUG = False

ALLOWED_HOSTS = [
    "josezaltar.pythonanywhere.com",  # seu backend em produção
    "localhost",
    "127.0.0.1",
]

# Origem confiável para POST/CSRF vindos do front
CSRF_TRUSTED_ORIGINS = [
    "https://twiiclone.netlify.app",
    "https://josezaltar.pythonanywhere.com",
]

# ========================
# Apps
# ========================
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

AUTH_USER_MODEL = "social.User"

# ========================
# Middleware
# ========================
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    # Coloque o CORS o mais alto possível
    "corsheaders.middleware.CorsMiddleware",
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

# ========================
# Banco de dados
# ========================
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

# ========================
# Locale / TZ
# ========================
LANGUAGE_CODE = "pt-br"
TIME_ZONE = "America/Sao_Paulo"
USE_I18N = True
USE_TZ = True

# ========================
# Arquivos estáticos / mídia
# ========================
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

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ========================
# DRF / JWT
# ========================
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=12),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
}

# ========================
# CORS (front no Netlify)
# ========================
CORS_ALLOWED_ORIGINS = [
    "https://twiiclone.netlify.app",
    "http://localhost:3000",
]
# (por padrão já permite cabeçalho Authorization)

# ========================
# Segurança em produção (PA)
# ========================
# PythonAnywhere faz o TLS na frente e envia o header abaixo:
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

# Força HTTPS, cookies seguros e CSRF seguro em produção
if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_REFERRER_POLICY = "same-origin"
    SECURE_CONTENT_TYPE_NOSNIFF = True
