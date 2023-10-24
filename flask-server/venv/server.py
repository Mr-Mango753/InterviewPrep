from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from transformers import AutoProcessor, BarkModel
import scipy
import os

app = Flask(__name__, static_folder="audio_files")
cors = CORS(app, resources={r"/generate_audio": {"origins": "http://localhost:3000"}})

# CORS(app)
# os.environ['SUNO_USE_SMALL_MODELS'] = 'True'
os.environ["SUNO_OFFLOAD_CPU"] = "True"
os.environ["SUNO_USE_SMALL_MODELS"] = "True"
processor = AutoProcessor.from_pretrained("suno/bark")
model = BarkModel.from_pretrained("suno/bark")
AUDIO_FOLDER = "audio_files"
print(os.path.abspath(AUDIO_FOLDER))


@app.route('/generate_audio', methods=['POST'])
def generate_audio():
    try:
        text = request.json['text']
        voice_preset = "v2/en_speaker_6"
        inputs = processor(text, voice_preset=voice_preset)
        audio_array = model.generate(**inputs)
        audio_array = audio_array.cpu().numpy().squeeze()
        output_filename = os.path.join(AUDIO_FOLDER, f"audio1.wav")
        sample_rate = model.generation_config.sample_rate
        scipy.io.wavfile.write(output_filename, rate=sample_rate, data=audio_array)
        return jsonify({"audio_file": os.path.basename(output_filename)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/audio_files/<filename>', methods=['GET'])
def serve_audio_file(filename):
    """Serve the audio file to the frontend."""
    return send_from_directory(AUDIO_FOLDER, filename)

# @app.route('/test_audio', methods=['GET'])
# def test_audio():
#     """Serve a specific audio file."""
#     return send_from_directory(AUDIO_FOLDER, "audio1.wav")

@app.route('/simple_test')
def simple_test():
    """Serve a specific audio file directly."""
    return send_from_directory("/Users/jadon/Desktop/Fall 2023/338/my-app/audio_files", "audio1.wav")


if __name__ == '__main__':
    # Ensure the audio directory exists
    if not os.path.exists(AUDIO_FOLDER):
        os.makedirs(AUDIO_FOLDER)

    app.run(debug=True)
