from .serializers import ProductSerializer
from rest_framework.response import Response
from .models import Product
from rest_framework.views import APIView
from rest_framework import status
from DjangoApi.utilities import get_exception_status_code


class LatestProductList(APIView):
    def get(self, *args, **kwargs):
        try:
            products = Product.objects.all()[:4]
            serializer = ProductSerializer(instance=products, many=True)
            response = serializer.data
            status_code = status.HTTP_200_OK
        except Exception as e:
            response, status_code = get_exception_status_code(e)
        return Response(response, status=status_code)
