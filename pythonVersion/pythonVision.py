#  __   ___    _            __  __ _                            _        
#  \ \ / (_)__(_)___ _ _   |  \/  (_)__ _ _ ___ ___ ___ _ ___ _(_)__ ___ 
#   \ V /| (_-< / _ \ ' \  | |\/| | / _| '_/ _ (_-</ -_) '_\ V / / _/ -_)
#    \_/ |_/__/_\___/_||_| |_|  |_|_\__|_| \___/__/\___|_|  \_/|_\__\___|
#
# 
#  This microservice returns the text in an image file. Its easiest if
#  the file itself is in the same directory as the python script.
#  
#  Run `pip install --upgrade google-cloud-vision` before executing
# 
#  Install the gcloud CLI https://cloud.google.com/sdk/docs/install
#
#  Have your environment variable key set before executing.
#  Windows(powershell): $env:GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"
#  Windows(command prompt): set GOOGLE_APPLICATION_CREDENTIALS=KEY_PATH
#  Unix: export GOOGLE_APPLICATION_CREDENTIALS="KEY_PATH"
#
#  Example Usage
#
#  If an image named "image.jpg" is in the same directory as the program
#  Method 1: Pass as an argument
#  python3 pythonVision.py image.jpg
#  
#  Method 2: Pass as text
#  python3 pythonVision.py
#  image.jpg

import io
import os
import sys

# Imports the Google Cloud client library
from google.cloud import vision

# Instantiates a client
client = vision.ImageAnnotatorClient()

# Takes input as an arugment or as text input
if len(sys.argv) > 1:
    file_path = sys.argv[1]
else:
    file_name = input()
    file_path = os.path.abspath(file_name)


# Loads the image into memory
with io.open(file_path, 'rb') as image_file:
    content = image_file.read()
image = vision.Image(content=content)

# Performs label detection on the image file
annotations = client.text_detection(image=image).text_annotations

if len(annotations) > 0:
    print(annotations[0].description)
else:
    print("Error: No text found")
