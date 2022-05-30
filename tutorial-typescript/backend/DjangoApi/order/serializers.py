from rest_framework import serializers
from .models import Order, OrderItem
from django.db import transaction


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

    @transaction.atomic
    def create(self, validated_data):
        items = validated_data.pop("items")
        paid_amount = sum(
            [item["quantity"] * item.pop("price") for item in items]
        )
        order = Order.objects.create(
            **validated_data,
            user=self.context["user"],
            paid_amount=paid_amount
        )
        for item in items:
            OrderItem.objects.create(order=order, **item)

        return order
