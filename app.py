import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from rag import process_csv  # Import from rag.py for summary generation
from predicting_vals import process_complexity_csv  # Import for complexity prediction

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s %(levelname)s: %(message)s')

@app.route('/upload', methods=['POST'])
def upload_file():
    logging.debug("Received file upload request.")
    
    if 'file' not in request.files:
        logging.error("No file part in the request.")
        return jsonify({'error': 'No file part in the request'}), 400

    file = request.files['file']
    logging.debug(f"File found in request: {file.filename}")

    if file.filename == '':
        logging.error("No file selected for upload.")
        return jsonify({'error': 'No selected file'}), 400

    try:
        if file:
            # Generate a safe file path to save the uploaded file
            filepath = os.path.join('/tmp', file.filename)
            logging.debug(f"Saving uploaded file to: {filepath}")
            
            # Save the file
            file.save(filepath)

            # Call the process_csv function to generate the summary (from rag.py)
            logging.debug(f"Processing the uploaded CSV file for summary at: {filepath}")
            summary_result = process_csv(filepath)
            logging.debug(f"Summary processed. Result: {summary_result}")

            # Call the process_complexity_csv function for complexity prediction (from predicting_vals.py)
            logging.debug(f"Processing the uploaded CSV file for complexity at: {filepath}")
            complexity_result = process_complexity_csv(filepath)
            logging.debug(f"Complexity processed. Result: {complexity_result}")

            # Remove the file after processing
            logging.debug(f"Removing file after processing: {filepath}")
            os.remove(filepath)

            # Combine the results
            combined_result = {
                'summary': summary_result,
                'complexity': complexity_result
            }

            return jsonify(combined_result), 200
        else:
            logging.error("File is empty or not found after checking.")
    except Exception as e:
        logging.exception("Exception occurred during file upload or processing.")
        return jsonify({'error': 'File processing failed', 'details': str(e)}), 500

    return jsonify({'error': 'File upload failed'}), 500

if __name__ == '__main__':
    app.run(debug=True)
