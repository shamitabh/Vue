from django.urls import path
from .views import Checkout

app_name = "order"

urlpatterns = [
    path("checkout", Checkout.as_view(), name="latest"),
]
