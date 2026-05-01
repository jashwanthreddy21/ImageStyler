# # from flask import Flask, request, jsonify, send_file
# # import tensorflow as tf
# # from PIL import Image
# # import numpy as np
# # import io
# # import os
# #
# # app = Flask(__name__)
# #
# # # Load the model
# # model_path = r"C:\Users\jogus\Desktop\Major\ArtStyleTransfer\savedDirectory"
# # model = tf.saved_model.load(model_path)
# #
# # def preprocess_image(image):
# #     """Preprocess the input image for the model."""
# #     img = Image.open(image)
# #     img = img.resize((256, 256))  # Resize if required
# #     img_array = np.array(img) / 255.0
# #     return np.expand_dims(img_array, axis=0)
# #
# # def postprocess_image(output):
# #     """Postprocess the model's output for display."""
# #     output = np.squeeze(output, axis=0)  # Remove batch dimension
# #     output = (output * 255).astype(np.uint8)
# #     return Image.fromarray(output)
# #
# # @app.route('/blend', methods=['POST'])
# # def blend_images():
# #     if 'content_image' not in request.files or 'style_image' not in request.files:
# #         return jsonify({"error": "Please upload both content and style images."}), 400
# #
# #     content_image = request.files['content_image']
# #     style_image = request.files['style_image']
# #
# #     # Preprocess images
# #     content = preprocess_image(content_image)
# #     style = preprocess_image(style_image)
# #
# #     # Blend images using the model
# #     output = model({"placeholder": content, "placeholder_1": style})['blended_image']
# #
# #     # Postprocess and save the output
# #     output_image = postprocess_image(output)
# #     output_io = io.BytesIO()
# #     output_image.save(output_io, format='PNG')
# #     output_io.seek(0)
# #
# #     return send_file(output_io, mimetype='image/png')
# #
# # if __name__ == "__main__":
# #     app.run(debug=True)
#
# from flask import Flask, request, send_file
# import tensorflow as tf
# import numpy as np
# from PIL import Image
# import io
#
# app = Flask(__name__)
# model = tf.saved_model.load(r"C:\Users\jogus\Desktop\Major\ArtStyleTransfer\savedDirectory")
#
# print("Available Signatures:")
# for key, value in model.signatures.items():
#     print(f"Signature: {key}")
#     print(value.structured_input_signature)
#     print(value.structured_outputs)
#
# @app.route('/blend', methods=['POST'])
# def blend_images():
#     content_image = request.files['content_image']
#     style_image = request.files['style_image']
#
#     # Preprocess content and style images
#     content = Image.open(content_image).resize((256, 256))
#     content = np.array(content) / 255.0
#     content = np.expand_dims(content, axis=0)
#
#     style = Image.open(style_image).resize((256, 256))
#     style = np.array(style) / 255.0
#     style = np.expand_dims(style, axis=0)
#
#     # Get the output from the model
#     output = model({"placeholder": content, "placeholder_1": style})['blended_image']
#
#     # Post-process output
#     blended_image = np.squeeze(output.numpy())
#     blended_image = (blended_image * 255).astype(np.uint8)
#     blended_image = Image.fromarray(blended_image)
#
#     # Save and return the output image
#     buffer = io.BytesIO()
#     blended_image.save(buffer, format="PNG")
#     buffer.seek(0)
#     return send_file(buffer, mimetype="image/png")
#
# if __name__ == '__main__':
#     app.run(debug=True)
#
# from flask import Flask, request, send_file
# import tensorflow as tf
# import numpy as np
# from PIL import Image
# import io

# app = Flask(__name__)
#
# # Load the model
# model = tf.saved_model.load(r"C:\Users\jogus\Desktop\Major\ArtStyleTransfer\savedDirectory")
#
# # Print available signatures and their inputs/outputs for debugging
# print("Available Signatures:")
# for key, value in model.signatures.items():
#     print(f"Signature: {key}")
#     print(value.structured_input_signature)
#     print(value.structured_outputs)
#
#
#
# content = Image.open(r"C:\Users\jogus\Desktop\content1.png").resize((256, 256))
# content = np.array(content) / 255.0
# content = np.expand_dims(content, axis=0)  # Add batch dimension
#
# style = Image.open(r"C:\Users\jogus\Desktop\style.png").resize((256, 256))
# style = np.array(style) / 255.0
# style = np.expand_dims(style, axis=0)  # Add batch dimension
#
# # Perform inference using correct input names
# output = model.signatures["serving_default"](placeholder=tf.constant(content), placeholder_1=tf.constant(style))
#
# # Extract the output tensor from the model
# blended_image = output['output_0'].numpy()
#
# # Save the result as an image
# blended_image = np.squeeze(blended_image)
# blended_image = (blended_image * 255).astype(np.uint8)  # Convert to 8-bit image
# blended_image = Image.fromarray(blended_image)
# blended_image.save("output_image.png")
#
# @app.route('/blend', methods=['POST'])
# def blend_images():
#     try:
#         # Get the content and style images from the request
#         content_image = request.files['content_image']
#         style_image = request.files['style_image']
#
#         # Preprocess content and style images
#         content = Image.open(content_image).resize((256, 256))
#         content = np.array(content) / 255.0
#         content = np.expand_dims(content, axis=0)  # Add batch dimension
#
#         style = Image.open(style_image).resize((256, 256))
#         style = np.array(style) / 255.0
#         style = np.expand_dims(style, axis=0)  # Add batch dimension
#
#         # Get the output from the model using the correct input names
#         output = model.signatures["serving_default"](placeholder=tf.constant(content), placeholder_1=tf.constant(style))
#
#         # Extract the output tensor from the model
#         blended_image = output['output_0'].numpy()  # Use 'output_0' instead of 'blended_image'
#
#         # Post-process output (clip to [0, 255] and convert to uint8)
#         blended_image = np.squeeze(blended_image)  # Remove batch dimension
#         blended_image = (blended_image * 255).astype(np.uint8)  # Convert to 8-bit image
#         blended_image = Image.fromarray(blended_image)
#
#         # Save and return the output image as PNG
#         buffer = io.BytesIO()
#         blended_image.save(buffer, format="PNG")
#         buffer.seek(0)
#         return send_file(buffer, mimetype="image/png")
#
#     except Exception as e:
#         return f"Error: {str(e)}", 500
#
# if __name__ == '__main__':
#     app.run(debug=True)

import tensorflow as tf
import numpy as np
from PIL import Image
import io
from flask import Flask, request, send_file
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
model = tf.saved_model.load(r"C:\Users\jogus\Desktop\Major\ArtStyleTransfer\savedDirectory")

print("Available Signatures:")
for key, value in model.signatures.items():
    print(f"Signature: {key}")
    print(value.structured_input_signature)
    print(value.structured_outputs)


@app.route('/blend', methods=['POST'])
def blend_images():
    try:
        # Get the content and style images from the request
        content_image = request.files['content_image']
        style_image = request.files['style_image']

        # Preprocess content and style images
        content = Image.open(content_image).resize((256, 256))
        content = content.convert('RGB')  # Convert to RGB in case it's RGBA
        content = np.array(content, dtype=np.float32) / 255.0  # Ensure float32
        content = np.expand_dims(content, axis=0)  # Add batch dimension

        style = Image.open(style_image).resize((256, 256))
        style = style.convert('RGB')  # Convert to RGB in case it's RGBA
        style = np.array(style, dtype=np.float32) / 255.0  # Ensure float32
        style = np.expand_dims(style, axis=0)  # Add batch dimension

        # Perform inference using the model
        output = model.signatures["serving_default"](placeholder=tf.constant(content), placeholder_1=tf.constant(style))

        # Extract the output tensor from the model
        blended_image = output['output_0'].numpy()

        # Post-process output (clip to [0, 255] and convert to uint8)
        blended_image = np.squeeze(blended_image)  # Remove batch dimension
        blended_image = (blended_image * 255).astype(np.uint8)  # Convert to 8-bit image
        blended_image = Image.fromarray(blended_image)

        # Save and return the output image as PNG
        buffer = io.BytesIO()
        blended_image.save(buffer, format="PNG")
        buffer.seek(0)
        return send_file(buffer, mimetype="image/png")

    except Exception as e:
        print(f"Error: {str(e)}")  # Log the error to the console
        return f"Error: {str(e)}", 500


if __name__ == '__main__':
    app.run(debug=True)


