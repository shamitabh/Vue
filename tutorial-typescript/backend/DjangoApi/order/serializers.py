from rest_framework import serializers
from .models import Order, OrderItem


class OrderItemSerializer(serializers.ModelSerializer):
    price = serializers.DecimalField(max_digits=8, decimal_places=2)

    class Meta:
        model = OrderItem
        fields = ("price", "product", "quantity")


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = Order
        fields = (
            "first_name",
            "last_name",
            "email",
            "address",
            "zipcode",
            "place",
            "phone",
            "stripe_token",
            "items",
        )

    def get_items(self, instance):
        return OrderItemSerializer(instance=instance.items, many=True).data

    def create(self, validated_data):
        items = validated_data.pop("items")
        order = Order.objects.create(*validated_data)
        for item in items:
            OrderItem.objects.create(order=order, **item)

        return order
