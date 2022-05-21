from django.urls import path
from .views import LatestProductList

app_name = "product"

urlpatterns = [path("latest", LatestProductList.as_view(), name="latest")]
