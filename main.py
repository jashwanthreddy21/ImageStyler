from flask import Flask, request, jsonify, send_file
from io import BytesIO
from PIL import Image
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# Load the TensorFlow Hub model
stylize_model = hub.load("https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2")
# stylize_model = tf.saved_model.load(os.path.join(os.path.dirname(os.path.abspath(__file__)), "savedDirectory"))

# Function to load and preprocess the image
def load_image(image_file, image_size=(512, 512)):
    img = Image.open(image_file)
    img = np.array(img).astype(np.float32)[np.newaxis, ...]

    if img.max() > 1.0:
        img = img / 255.0
    if len(img.shape) == 3:
        img = tf.stack([img, img, img], axis=-1)
    img = tf.image.resize(img, image_size, preserve_aspect_ratio=True)
    return img

# Function to export the stylized image as a downloadable file
def export_image(tf_img):
    pil_image = Image.fromarray(np.squeeze(tf_img * 255).astype(np.uint8))
    buffer = BytesIO()
    pil_image.save(buffer, format="PNG")
    buffer.seek(0)
    return buffer

@app.route('/style-transfer', methods=['POST'])
def style_transfer():
    # Ensure both images are uploaded
    if 'content_image' not in request.files or 'style_image' not in request.files:
        return jsonify({"error": "Both content and style images are required."}), 400

    content_image_file = request.files['content_image']
    style_image_file = request.files['style_image']

    try:
        # Preprocess the images
        content_image = load_image(content_image_file)
        style_image = load_image(style_image_file)
        style_image = tf.nn.avg_pool(style_image, ksize=[3, 3], strides=[1, 1], padding='VALID')

        # Generate the stylized image
        results = stylize_model(tf.constant(content_image), tf.constant(style_image))
        stylized_image = results[0]

        # Convert to downloadable format
        image_buffer = export_image(stylized_image)

        return send_file(
            image_buffer,
            mimetype="image/png",
            as_attachment=True,
            download_name="stylized_image.png",
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
