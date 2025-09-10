from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.conf import settings
from django.conf.urls.static import static


def root_ok(_request):
    return JsonResponse({"status": "ok", "app": "Twiclone API"})


urlpatterns = [
    path("", root_ok),  # GET /
    path("admin/", admin.site.urls),
    path("api/", include("social.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
