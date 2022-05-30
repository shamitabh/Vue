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
            serializer = OrderSerializer(
                data=self.request.data,
                context={"user": self.request.user},
            )
            serializer.is_valid(raise_exception=True)
            # Disabling Stripe functionality as it does not support India
            # stripe.api_key = settings.STRIPE_SECRET_KEY
            # stripe.Charge.create(
            #     amount=int(paid_amount) * 100,
            #     currency="INR",
            #     description="Charge from Djackets",
            #     source=serializer.validated_data["stripe_token"],
            # )
            serializer.save()
            response = {"detail": "Order placed successfully."}
            status_code = status.HTTP_200_OK
        except Exception as e:
            response, status_code = get_exception_status_code(e)
        return Response(response, status=status_code)
