from pathlib import Path
from datetime import timedelta
import os
import dj_database_url

# === Diretórios ===
BASE_DIR = Path(__file__).resolve().parent.parent

# === Dotenv (carrega o .env explicitamente do BASE_DIR) ===
# Isso garante que em produção (PythonAnywhere) seu .env seja lido.
try:
    from dotenv import load_dotenv

    load_dotenv(BASE_DIR / ".env")
except Exception:
    pass


# === Helpers de env ===
def env(name: str, default: str | None = None) -> str | None:
    return os.environ.get(name, default)


def env_bool(name: str, default: bool = False) -> bool:
    v = os.environ.get(name)
    if v is None:
        return default
    return str(v).lower() in ("1", "true", "yes", "on")


def env_list(name: str, default: str = "") -> list[str]:
    raw = os.environ.get(name, default)
    return [x.strip() for x in raw.split(",") if x.strip()]


# === Segurança / Debug ===
SECRET_KEY = env("DJANGO_SECRET_KEY", "dev_change_me")
# Em produção, queremos False por padrão; mude via DJANGO_DEBUG no .env
DEBUG = env_bool("DJANGO_DEBUG", False)

# Hosts permitidos — default já compatível com PythonAnywhere
ALLOWED_HOSTS = env_list(
    "DJANGO_ALLOWED_HOSTS",
    "josezaltar.pythonanywhere.com,localhost,127.0.0.1",
)

# CSRF: inclua seus domínios com esquema (https://)
CSRF_TRUSTED_ORIGINS = env_list(
    "DJANGO_CSRF_TRUSTED",
    "https://*.netlify.app,https://*.pythonanywhere.com",
)

# === Apps ===
INSTALLED_APPS = [
    # Django
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # 3rd
    "rest_framework",
    "corsheaders",
    # app local
    "social",
]

# Se você REALMENTE tiver um User customizado em social.models.User, mantenha:
# AUTH_USER_MODEL = "social.User"

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    # WhiteNoise para arquivos estáticos em produção
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

# === Banco de Dados ===
DATABASES = {
    "default": dj_database_url.parse(
        env("DATABASE_URL", f"sqlite:///{BASE_DIR / 'db.sqlite3'}"),
        conn_max_age=600,
    )
}

# === Validação de senha (simples por enquanto) ===
AUTH_PASSWORD_VALIDATORS = []

# === Locale/Timezone ===
LANGUAGE_CODE = "pt-br"
TIME_ZONE = "America/Sao_Paulo"
USE_I18N = True
USE_TZ = True

# === Arquivos estáticos / mídia ===
STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# === CORS ===
# Para chamada direta do Netlify, defina no .env:
# CORS_ALLOWED_ORIGINS=https://twiiclone.netlify.app
CORS_ALLOWED_ORIGINS = env_list(
    "CORS_ALLOWED_ORIGINS",
    "http://localhost:3000",
)
# Regex para subdomínios comuns (opcional)
CORS_ALLOWED_ORIGIN_REGEXES = [
    r"^https://.*\.netlify\.app$",
    r"^https://.*\.pythonanywhere\.com$",
]

# Se usar cookies/sessão cross-site:
# CORS_ALLOW_CREDENTIALS = True

# === DRF + JWT ===
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": ("rest_framework.permissions.IsAuthenticated",),
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=3),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=30),
}
