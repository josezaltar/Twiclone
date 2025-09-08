from pathlib import Path
from datetime import timedelta
import os

# ---- .env ----
try:
    from dotenv import load_dotenv
except Exception:

    def load_dotenv(*args, **kwargs):  # fallback no-op
        return False


BASE_DIR = Path(__file__).resolve().parent.parent
ENV_FILE = BASE_DIR / ".env"
_ENV_LOADED = load_dotenv(ENV_FILE)  # aparece na página de debug


# ---- helpers ----
def env_bool(name: str, default: str = "False") -> bool:
    return os.environ.get(name, default).strip().lower() in {
        "1",
        "true",
        "t",
        "yes",
        "on",
    }


def env_list(name: str, default: str = "") -> list[str]:
    raw = os.environ.get(name, default)
    return [x.strip() for x in raw.split(",") if x.strip()]


# ---------------- Core ----------------
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "CHANGE-ME-NO-PROD")
DEBUG = env_bool("DJANGO_DEBUG", "False")

# Garanta que o host do PythonAnywhere esteja aqui,
# mesmo que o .env não seja lido.
DEFAULT_HOSTS = "josezaltar.pythonanywhere.com,localhost,127.0.0.1"
ALLOWED_HOSTS = env_list("DJANGO_ALLOWED_HOSTS", DEFAULT_HOSTS)

# CSRF (para formulários/admin). Se sua API é só JSON, ainda é bom ter.
DEFAULT_TRUSTED = "https://josezaltar.pythonanywhere.com"
CSRF_TRUSTED_ORIGINS = env_list("DJANGO_CSRF_TRUSTED", DEFAULT_TRUSTED)

# --------------- Apps -----------------
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt.token_blacklist",
    "corsheaders",
    "whitenoise.runserver_nostatic",
    "social",
]

AUTH_USER_MODEL = "social.User"

# ------------- Middleware -------------
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",  # alto, antes de Common
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
        "DIRS": [BASE_DIR / "templates"],
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

# --------------- DB -------------------
import dj_database_url

DATABASES = {
    "default": dj_database_url.config(
        env="DATABASE_URL",
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
    )
}

# ---------- I18N / TZ ----------
LANGUAGE_CODE = "pt-br"
TIME_ZONE = os.environ.get("TZ", "America/Sao_Paulo")
USE_I18N = True
USE_TZ = True

# ---------- Static / Media ----------
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ------------- DRF / JWT -------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=12),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": False,
    "BLACKLIST_AFTER_ROTATION": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

# --------------- CORS -----------------
# Preencha no .env se tiver um front específico (ex.: vercel)
CORS_ALLOWED_ORIGINS = env_list("CORS_ALLOWED_ORIGINS", "http://localhost:3000")
# Em dev, se não houver lista, libera tudo.
if DEBUG and not CORS_ALLOWED_ORIGINS:
    CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True

# -------- Segurança (prod) -----------
# No PA, estamos atrás de proxy; isto garante scheme correto.
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

if not DEBUG:
    SECURE_SSL_REDIRECT = True
    SECURE_HSTS_SECONDS = 3600
    SECURE_HSTS_INCLUDE_SUBDOMAINS = False
    SECURE_HSTS_PRELOAD = False
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
