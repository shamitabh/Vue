from rest_framework import status, serializers
import traceback


def get_exception_status_code(exception):
    print(traceback.format_exc())
    response = {"message": exception.args[0]}
    if type(exception) is serializers.ValidationError:
        status_code = status.HTTP_400_BAD_REQUEST
    else:
        status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    return response, status_code
