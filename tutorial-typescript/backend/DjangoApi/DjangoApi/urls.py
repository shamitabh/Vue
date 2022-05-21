from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

internal_urls = [
    path("admin/", admin.site.urls),
]

external_urls = [
    path("api/rest-auth/", include("rest_framework.urls")),
    path("api/auth/", include("djoser.urls")),
    path("api/auth/", include("djoser.urls.authtoken")),
]

custom_urls = [
    path("api/products/", include("product.urls", namespace="product"))
]

urlpatterns = (
    internal_urls
    + external_urls
    + custom_urls
    + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
)
