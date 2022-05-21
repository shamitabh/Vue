from django.dispatch import receiver
from django.db.models.signals import pre_save
from .models import Product, Category
from DjangoApi.utilities import make_thumbnail


@receiver(pre_save, sender=Product)
@receiver(pre_save, sender=Category)
def pre_save_set_slug(sender, **kwargs):
    instance = kwargs["instance"]
    if not instance.slug:
        instance.slug = "-".join(instance.name.lower().split(" "))


@receiver(pre_save, sender=Product)
def pre_save_set_thumbnail(sender, **kwargs):
    instance = kwargs["instance"]
    if not instance.thumbnail and instance.image:
        instance.thumbnail = make_thumbnail(instance.image)
        instance.save()
