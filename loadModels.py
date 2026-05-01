from flask import Flask, request, render_template, jsonify, send_file, Response
import cv2
import os
import time
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
from flask_cors import CORS
from io import BytesIO
from PIL import Image

app = Flask(__name__)
CORS(app)

# Load models
UPSCALE_MODEL_PATH = "https://tfhub.dev/captain-pool/esrgan-tf2/1"
STYLE_MODEL_PATH = r"C:\Users\jogus\Desktop\Major\ArtStyleTransfer\savedDirectory"

upscale_model = hub.load(UPSCALE_MODEL_PATH)
stylize_model = tf.saved_model.load(STYLE_MODEL_PATH)

# Function for upscaling images
def enhance_image(img):
    pp_image = preprocess_image(img)
    start = time.time()
    upscaled_img = upscale_model(pp_image)
    upscaled_img = tf.squeeze(upscaled_img)
    print("Time Taken: %f" % (time.time() - start))
    return upscaled_img

# Preprocess image for upscaling
def preprocess_image(pp_image):
    if pp_image.shape[-1] == 4:
        pp_image = pp_image[..., :-1]
    hr_size = (tf.convert_to_tensor(pp_image.shape[:-1]) // 4) * 4
    pp_image = tf.image.crop_to_bounding_box(pp_image, 0, 0, hr_size[0], hr_size[1])
    pp_image = tf.cast(pp_image, tf.float32)
    return tf.expand_dims(pp_image, 0)

# Function to load and preprocess images for style transfer
def load_image(image_file, image_size=(512, 512)):
    img = Image.open(image_file)
    img = np.array(img).astype(np.float32)[np.newaxis, ...]
    if img.max() > 1.0:
        img = img / 255.0
    if len(img.shape) == 3:
        img = tf.stack([img, img, img], axis=-1)
    img = tf.image.resize(img, image_size, preserve_aspect_ratio=True)
    return img

# Export stylized image
def export_image(tf_img):
    pil_image = Image.fromarray(np.squeeze(tf_img * 255).astype(np.uint8))
    buffer = BytesIO()
    pil_image.save(buffer, format="PNG")
    buffer.seek(0)
    return buffer

# Home route
@app.route('/')
def index():
    return render_template('index.html')

# Image upscaling route
@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['image']
    img = cv2.imdecode(np.frombuffer(file.read(), np.uint8), cv2.IMREAD_COLOR)
    enhanced_img = enhance_image(img)
    print(f"Original Shape: {img.shape}")
    print(f"Enhanced Shape: {enhanced_img.shape}")
    numpy_image = enhanced_img.numpy()
    _, encoded_img = cv2.imencode('.jpg', numpy_image)
    byte_image = encoded_img.tobytes()
    return Response(byte_image, mimetype='image/jpeg')

# Style transfer route
@app.route('/style-transfer', methods=['POST'])
def style_transfer():
    if 'content_image' not in request.files or 'style_image' not in request.files:
        return jsonify({"error": "Both content and style images are required."}), 400
    content_image_file = request.files['content_image']
    style_image_file = request.files['style_image']
    try:
        content_image = load_image(content_image_file)
        style_image = load_image(style_image_file)
        style_image = tf.nn.avg_pool(style_image, ksize=[3, 3], strides=[1, 1], padding='VALID')
        results = stylize_model(tf.constant(content_image), tf.constant(style_image))
        stylized_image = results[0]
        image_buffer = export_image(stylized_image)
        return send_file(image_buffer, mimetype="image/png", as_attachment=True, download_name="stylized_image.png")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)