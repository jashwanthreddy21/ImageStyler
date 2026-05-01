from flask.wrappers import Response
from flask import Flask, request, render_template
import cv2
import os
import time
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
from flask_cors import CORS

os.environ["TFHUB_DOWNLOAD_PROGRESS"] = "True"
app = Flask(__name__)
CORS(app)

# Load SRCNN model
SAVED_MODEL_PATH = "https://tfhub.dev/captain-pool/esrgan-tf2/1"
model = None


# Define function for image upscaling and enhancement
def enhance_image(img):
    pp_image = preprocess_image(img)

    start = time.time()
    upscaled_img = model(pp_image)
    upscaled_img = tf.squeeze(upscaled_img)
    print("Time Taken: %f" % (time.time() - start))

    # https://www.javatpoint.com/fastnlmeansdenoising-in-python
    # enhanced_img = cv2.fastNlMeansDenoisingColored(upscaled_img, None, 10, 10, 7, 21)
    return upscaled_img


def preprocess_image(pp_image):
    """ Loads image from path and preprocesses to make it model ready
        Args:
          pp_image: image file
    """
    # If PNG, remove the alpha channel. The model only supports
    # images with 3 color channels.
    if pp_image.shape[-1] == 4:
        pp_image = pp_image[..., :-1]
    hr_size = (tf.convert_to_tensor(pp_image.shape[:-1]) // 4) * 4
    pp_image = tf.image.crop_to_bounding_box(pp_image, 0, 0, hr_size[0], hr_size[1])
    pp_image = tf.cast(pp_image, tf.float32)
    return tf.expand_dims(pp_image, 0)


# Define route for homepage
@app.route('/')
def index():
    return render_template('index.html')


# Define route for image upload
@app.route('/upload', methods=['POST'])
def upload():
    # Load uploaded image
    file = request.files['image']

    # Read bytes and convert them to image
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    # Enhance image
    enhanced_img = enhance_image(img)

    print(f"Original Shape: {img.shape}")
    print(f"Enhanced Shape: {enhanced_img.shape}")

    # Encode enhanced image
    numpy_image = enhanced_img.numpy()
    _, encoded_img = cv2.imencode('.jpg', numpy_image)
    byte_image = encoded_img.tobytes()

    # Encode original image
    _, encoded_orig_img = cv2.imencode('.jpg', img)
    encoded_orig_img = encoded_orig_img.tobytes()

    # Create response
    # response = []
    # response.append(Response(byte_image, mimetype='image/jpeg'))
    # response.append(Response(encoded_orig_img, mimetype='image/jpeg'))
    response = Response(byte_image, mimetype='image/jpeg')

    return response


if __name__ == '__main__':
    # Initialize model
    model = hub.load(SAVED_MODEL_PATH)
    app.run(debug=True)

# from flask import Flask, request, Response, render_template
# import cv2
# import os
# import time
# import numpy as np
# import tensorflow as tf
# import tensorflow_hub as hub
# from flask_cors import CORS
#
# os.environ["TFHUB_DOWNLOAD_PROGRESS"] = "True"
# app = Flask(__name__)
# CORS(app)


# Load SRCNN model once at startup
# def load_model():
#     print("Loading model... This may take a few seconds.")
#     model = hub.load("https://tfhub.dev/captain-pool/esrgan-tf2/1")
#     print("Model loaded successfully!")
#     return model
#
#
# model = load_model()
#
#
# def preprocess_image(img):
#     """ Preprocesses the image for the model """
#     if img.shape[-1] == 4:
#         img = img[..., :-1]  # Remove alpha channel
#     hr_size = (np.array(img.shape[:-1]) // 4) * 4
#     img = img[:hr_size[0], :hr_size[1], :]  # Crop image efficiently
#     img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB
#     img = np.expand_dims(img.astype(np.float32), axis=0)  # Add batch dimension
#     return tf.convert_to_tensor(img)
#
#
# def enhance_image(img):
#     """ Enhances image using the model """
#     pp_image = preprocess_image(img)
#     start = time.time()
#     upscaled_img = model(pp_image)
#     upscaled_img = tf.squeeze(upscaled_img)
#     print(f"Time Taken for Enhancement: {time.time() - start:.2f}s")
#     numpy_image = np.array(upscaled_img * 255, dtype=np.uint8)  # Convert to uint8
#     return cv2.fastNlMeansDenoisingColored(numpy_image, None, 10, 10, 7, 21)
#
#
# def encode_image(img):
#     """ Encodes image to JPEG format """
#     return cv2.imencode('.jpg', img, [cv2.IMWRITE_JPEG_QUALITY, 90])[1].tobytes()
#
#
# @app.route('/')
# def index():
#     return render_template('index.html')
#
#
# @app.route('/upload', methods=['POST'])
# def upload():
#     file = request.files['image']
#     img_bytes = np.frombuffer(file.read(), np.uint8)
#     img = cv2.imdecode(img_bytes, cv2.IMREAD_UNCHANGED)
#
#     enhanced_img = enhance_image(img)
#     response = Response(encode_image(enhanced_img), mimetype='image/jpeg')
#
#     return response
#
#
# if __name__ == '__main__':
#     from waitress import serve  # Production-ready server
#
#     print("Starting Flask app...")
#     serve(app, host='0.0.0.0', port=5000)


from flask import Flask, request, render_template, Response
import cv2
import os
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
from flask_cors import CORS

os.environ["TFHUB_DOWNLOAD_PROGRESS"] = "True"
os.environ["TF_FORCE_GPU_ALLOW_GROWTH"] = "true"  # Prevent TensorFlow from allocating all GPU memory

app = Flask(__name__)
CORS(app)

SAVED_MODEL_PATH = "https://tfhub.dev/captain-pool/esrgan-tf2/1"
model = None  # Lazy loading of model


def load_model():
    """Load the model lazily to save memory."""
    global model
    if model is None:
        model = hub.load(SAVED_MODEL_PATH)
    return model


def enhance_image(img):
    """Enhance image using the model with memory-efficient preprocessing."""
    model = load_model()

    img = preprocess_image(img)

    # Optimize function call
    @tf.function
    def run_model(image):
        return model(image)

    upscaled_img = run_model(img)
    upscaled_img = tf.squeeze(upscaled_img)

    return upscaled_img.numpy()


def preprocess_image(img):
    """Preprocess image to be model-ready while minimizing memory usage."""
    # Ensure the image has 3 channels (RGB)
    if img.shape[-1] == 4:
        img = img[..., :-1]

    # Resize the image for efficiency
    img = cv2.resize(img, (256, 256), interpolation=cv2.INTER_AREA)  # Resize before processing

    # Convert to TensorFlow format
    img = tf.convert_to_tensor(img, dtype=tf.float32)
    img = tf.expand_dims(img, 0)  # Add batch dimension

    return img


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/upload', methods=['POST'])
def upload():
    """Handle image upload and enhancement while optimizing memory usage."""
    file = request.files['image']
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)

    if img is None:
        return Response("Invalid image file", status=400)

    enhanced_img = enhance_image(img)

    # Encode enhanced image
    _, encoded_img = cv2.imencode('.jpg', enhanced_img)
    byte_image = encoded_img.tobytes()

    return Response(byte_image, mimetype='image/jpeg')


if __name__ == '__main__':
    app.run(debug=True, threaded=True)  # Enable threading to prevent memory leaks
