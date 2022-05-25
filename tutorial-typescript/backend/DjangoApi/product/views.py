from .serializers import CategorySerializer, ProductSerializer
from rest_framework.response import Response
from .models import Category, Product
from rest_framework.views import APIView
from rest_framework import status
from DjangoApi.utilities import get_exception_status_code
from django.shortcuts import get_object_or_404


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


class ProductDetail(APIView):
    def get(self, *args, **kwargs):
        try:
            product = get_object_or_404(
                Product,
                category__slug=kwargs["category_slug"],
                slug=kwargs["product_slug"],
            )
            serializer = ProductSerializer(instance=product)
            response = serializer.data
            status_code = status.HTTP_200_OK
        except Exception as e:
            response, status_code = get_exception_status_code(e)
        return Response(response, status=status_code)


class CategoryDetail(APIView):
    def get(self, *args, **kwargs):
        try:
            product = get_object_or_404(
                Category,
                slug=kwargs["category_slug"],
            )
            serializer = CategorySerializer(instance=product)
            response = serializer.data
            status_code = status.HTTP_200_OK
        except Exception as e:
            response, status_code = get_exception_status_code(e)
        return Response(response, status=status_code)
