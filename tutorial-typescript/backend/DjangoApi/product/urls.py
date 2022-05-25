from django.urls import path
from .views import CategoryDetail, LatestProductList, ProductDetail

app_name = "product"

urlpatterns = [
    path("latest", LatestProductList.as_view(), name="latest"),
    path(
        "<slug:category_slug>/<slug:product_slug>",
        ProductDetail.as_view(),
        name="product-detail",
    ),
    path(
        "<slug:category_slug>",
        CategoryDetail.as_view(),
        name="category-detail",
    ),
]
