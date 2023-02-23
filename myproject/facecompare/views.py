from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from io import BytesIO
import requests


@csrf_exempt
def upload_image(request):
    if request.method == 'POST':
        image = request.FILES.get('image')

        # make sure we have an image
        if not image:
            return JsonResponse({'error': 'Please provide an image file.'}, status=400)

        # convert the image to bytes
        image_bytes = BytesIO(image.read())

        # send the image bytes to the compare API
        response = requests.post('http://localhost:8000/compare_image', files={'image': image_bytes})

        # return the response from the compare API
        return JsonResponse(response.json(), status=response.status_code)

    return JsonResponse({'error': 'Invalid request method.'}, status=400)


@csrf_exempt
def compare_image(request):
    api_key = 'd45fd466-51e2-4701-8da8-04351c872236'
    api_secret = '171e8465-f548-401d-b63b-caf0dc28df5f'

    # get image bytes
    image_bytes = request.FILES.get('image').read()

    # make sure we have an image
    if not image_bytes:
        return JsonResponse({'error': 'Please provide an image file to compare.'}, status=400)

    # make the API request to Betaface
    url = 'https://www.betafaceapi.com/api/v2/media/file'
    files = {'file': BytesIO(image_bytes)}
    data = {'api_key': api_key, 'api_secret': api_secret}
    response = requests.post(url, files=files, data=data)

    # parse to JSON
    response_json = response.json()

    # ensure successful response
    if response.status_code != 200 or 'faces' not in response_json:
        return JsonResponse({'error': 'Could not process the image file.'}, status=400)

    # extract features 
    features = response_json['faces'][0]['features']

    return JsonResponse({'features': features})
