from rest_framework import serializers
from .models import Product


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
