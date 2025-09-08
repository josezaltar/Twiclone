# twiclone/urls.py
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static


def health(_request):
    return JsonResponse(
        {"status": "ok", "service": "twiclone-api", "docs": "/api/"},
        json_dumps_params={"ensure_ascii": False},
    )


urlpatterns = [
    path("", health, name="root"),  # GET /
    path("api/ping/", health, name="ping"),  # GET /api/ping/
    path("admin/", admin.site.urls),
    path("api/", include("social.urls")),
]

# Em DEV apenas — em produção o PythonAnywhere serve /media via mapeamento de static files
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
