from rest_framework.views import APIView

from account.serializers import SignupSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework import status
from DjangoApi.utilities import get_exception_status_code


class SignupUser(APIView):
    def post(self, *args, **kwargs):
        try:
            serializer = SignupSerializer(data=self.request.data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            response = UserSerializer(instance=user).data
            status_code = status.HTTP_200_OK
        except Exception as e:
            response, status_code = get_exception_status_code(e)
        return Response(response, status=status_code)
