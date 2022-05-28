from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import password_validation


class SignupSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value

    def save(self):
        user = User(username=self.validated_data["username"])
        user.set_password(self.validated_data["password"])
        user.save()
        return user
