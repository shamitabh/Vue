from rest_framework import status, serializers
from django.http.response import Http404
import traceback
from io import BytesIO
from django.core.files import File
from PIL import Image


def get_exception_status_code(exception):
    print(traceback.format_exc())
    response = {"detail": exception.args[0]}
    if type(exception) is serializers.ValidationError:
        status_code = status.HTTP_400_BAD_REQUEST
    elif type(exception) is Http404:
        status_code = status.HTTP_404_NOT_FOUND
    else:
        status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
    return response, status_code


def make_thumbnail(image, size=(300, 200)):
    img = Image.open(image)
    img.convert("RGB")
    img.thumbnail(size)

    # create a file
    thumb_io = BytesIO()
    img.save(thumb_io, "JPEG", quality=85)
    thumbnail = File(thumb_io, name=image.name)

    return thumbnail
