from django.urls import path
from .views import LatestProductList, ProductDetail

app_name = "product"

urlpatterns = [
    path("latest", LatestProductList.as_view(), name="latest"),
    path(
        "<slug:category_slug>/<slug:product_slug>",
        ProductDetail.as_view(),
        name="detail",
    ),
]
