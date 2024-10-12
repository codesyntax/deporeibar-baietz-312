import requests


headers = {'Accept': 'application/json'}
auth = ('admin', "admin")
import base64
import os
import random


def main():
    results = requests.get('http://localhost:8080/Plone/@search?portal_type=Mendia&b_size=9999', headers=headers, auth=auth)
    if results.ok:

        for item in results.json()['items']:

            add_image(item['@id'])

def add_image(url):
    images = os.listdir('./images')
    image = random.choice(images)

    with open(f'./images/{image}', 'rb') as fp:
        encoded = base64.b64encode(fp.read())
        data = {
            "image": {
                "data": encoded.decode(),
                "encoding": "base64",
                "filename": image,
                "content-type": "image/jpeg"
            }
        }

        res = requests.patch(url, json=data, headers=headers, auth=auth)

        if res.ok:
            print('OK')
        else:
            print('Error')

if __name__ == '__main__':
    main()
