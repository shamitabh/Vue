from django.db import models
from django.contrib.auth.models import User


class Order(models.Model):
    user = models.ForeignKey(
        User, related_name="orders", on_delete=models.CASCADE
    )
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    address = models.TextField()
    zipcode = models.CharField(max_length=100)
    phone = models.CharField(max_length=100)
    place = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    paid_amount = models.DecimalField(
        max_digits=8, decimal_places=2, blank=True, null=True
    )
    stripe_token = models.CharField(max_length=100)

    class Meta:
        ordering = ("-created_at",)
        db_table = "tb_order"

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, related_name="items", on_delete=models.CASCADE
    )
    product = models.ForeignKey(
        "product.Product", related_name="items", on_delete=models.CASCADE
    )
    quantity = models.IntegerField(default=1)

    class Meta:
        db_table = "tb_order_item"

    def __str__(self):
        return self.id
