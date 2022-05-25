from rest_framework import serializers
from .models import Category, Product


class ProductSerializer(serializers.ModelSerializer):
    absolute_url = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = (
            "id",
            "name",
            "absolute_url",
            "description",
            "price",
            "image",
            "thumbnail",
        )

    def get_absolute_url(self, instance):
        return f"/{instance.category.slug}/{instance.slug}"


class CategorySerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ("id", "name", "slug", "products")

    def get_products(self, instance):
        return ProductSerializer(instance=instance.products, many=True).data
