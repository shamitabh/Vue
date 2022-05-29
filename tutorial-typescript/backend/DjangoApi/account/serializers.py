from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import password_validation


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username",)


class SignupSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate_password(self, value):
        password_validation.validate_password(value)
        return value

    def validate_username(self, value):
        user = User.objects.filter(username=value)
        if user.exists():
            raise serializers.ValidationError(
                "This username is already taken."
            )
        return value

    def save(self):
        user = User(username=self.validated_data["username"])
        user.set_password(self.validated_data["password"])
        user.save()
        return user
