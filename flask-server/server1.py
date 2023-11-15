from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os

client = OpenAI(api_key='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')

app = Flask(__name__)
CORS(app)

AUDIO_FOLDER = 'path_to_audio_folder'
if not os.path.exists(AUDIO_FOLDER):
    os.makedirs(AUDIO_FOLDER)

@app.route('/generate_speech', methods=['POST'])
def generate_speech():
    try:
        data = request.get_json()
        transcript = data.get('text')

        response = client.audio.speech.create(
            model="tts-1",
            voice="alloy",
            input=transcript,  
        )

        audio_file_name = "output.mp3"
        audio_file_path = os.path.join(AUDIO_FOLDER, audio_file_name)

        response.stream_to_file(audio_file_path)

        return jsonify({'audio_file_path': audio_file_path}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
