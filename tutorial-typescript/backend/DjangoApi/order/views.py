from locale import currency
from requests import request
import stripe
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Order, OrderItem
from rest_framework.views import APIView
from rest_framework import status
from DjangoApi.utilities import get_exception_status_code
from .serializers import OrderSerializer


class Checkout(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, *args, **kwargs):
        try:
            serializer = OrderSerializer(data=self.request.data)
            serializer.is_valid(raise_exception=True)
            stripe.api_key = settings.STRIPE_SECRET_KEY
            paid_amount = sum(
                [
                    item["quantity"] * item["price"]
                    for item in serializer.validated_data["items"]
                ]
            )
            stripe.Charge.create(
                amount=int(paid_amount) * 100,
                currency="INR",
                description="Charge from Djackets",
                source=serializer.validated_data["stripe_token"],
            )
            serializer.save(user=request.user, paid_amount=paid_amount)
            response = serializer.data
            status_code = status.HTTP_200_OK
        except Exception as e:
            response, status_code = get_exception_status_code(e)
        return Response(response, status=status_code)
