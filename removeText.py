from flask import Flask, request, Response
import cv2
import numpy as np
import keras_ocr
import math
import gc  # For memory cleanup

app = Flask(__name__)

# Load the keras-ocr pipeline once at startup
pipeline = keras_ocr.pipeline.Pipeline()


def midpoint(x1, y1, x2, y2):
    """Calculate the midpoint between two points."""
    x_mid = int((x1 + x2) / 2)
    y_mid = int((y1 + y2) / 2)
    return (x_mid, y_mid)


def inpaint_text(img):
    """Detect and remove text from an image using keras-ocr and OpenCV."""
    prediction_groups = pipeline.recognize([img])

    # Create a mask for inpainting
    mask = np.zeros(img.shape[:2], dtype="uint8")

    for box in prediction_groups[0]:
        x0, y0 = box[1][0]
        x1, y1 = box[1][1]
        x2, y2 = box[1][2]
        x3, y3 = box[1][3]

        x_mid0, y_mid0 = midpoint(x1, y1, x2, y2)
        x_mid1, y_mid1 = midpoint(x0, y0, x3, y3)

        # Calculate thickness based on text height
        thickness = int(math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2))

        # Draw mask and inpaint
        cv2.line(mask, (x_mid0, y_mid0), (x_mid1, y_mid1), 255, thickness)

    # Apply inpainting
    inpainted_img = cv2.inpaint(img, mask, 7, cv2.INPAINT_NS)

    return inpainted_img


@app.route('/upload', methods=['POST'])
def upload():
    """Handles image upload and text removal."""
    if 'image' not in request.files:
        return Response("No image uploaded", status=400)

    file = request.files['image']
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    if img is None:
        return Response("Invalid image format", status=400)

    # Process the image
    processed_img = inpaint_text(img)

    # Encode processed image
    _, encoded_img = cv2.imencode('.jpg', processed_img)
    byte_image = encoded_img.tobytes()

    # Free memory
    gc.collect()

    return Response(byte_image, mimetype='image/jpeg')


@app.route('/')
def index():
    return "Text Removal Flask API is Running!"


if __name__ == '__main__':
    app.run(debug=True, threaded=True)
