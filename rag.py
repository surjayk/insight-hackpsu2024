import torch
from transformers import BartForConditionalGeneration, BartTokenizer
import nltk
import pandas as pd
import json
from nltk.tokenize import sent_tokenize
import logging

# Set up logging
logging.basicConfig(
    level=logging.DEBUG, 
    format='%(asctime)s - %(levelname)s - %(message)s'
)

nltk.download('punkt')
nltk.download('wordnet')
nltk.download('omw-1.4')
nltk.download('punkt_tab')

# Preprocess function
def preprocess_data(data):
    logging.debug(f"Raw data: {data}")
    try:
        # Remove brackets from string representations and limit to 5 items for each field
        patient_id = data['PATIENT']
        conditions = ', '.join(eval(data['ALL_CONDITIONS'])[:5])
        medications = ', '.join(eval(data['MEDICATIONS'])[:5])  # Fixed this line
        encounters = ', '.join(eval(data['ALL_ENCOUNTERS'])[:5])
        procedures = ', '.join(eval(data['ALL_PROCEDURES'])[:5])

        logging.debug(f"Processed patient_id: {patient_id}")
        logging.debug(f"Processed conditions: {conditions}")
        logging.debug(f"Processed medications: {medications}")
        logging.debug(f"Processed encounters: {encounters}")
        logging.debug(f"Processed procedures: {procedures}")

        return {
            'patient_id': patient_id,
            'conditions': conditions,
            'medications': medications,
            'encounters': encounters,
            'procedures': procedures
        }
    except Exception as e:
        logging.error(f"Error in preprocess_data: {e}")
        raise

# Summary generation function
def generate_summary_bart(patient_data):
    logging.debug(f"Generating summary for: {patient_data}")
    try:
        # Load BART model and tokenizer
        model_name = "facebook/bart-base"
        tokenizer = BartTokenizer.from_pretrained(model_name)
        model = BartForConditionalGeneration.from_pretrained(model_name)

        # Construct input text
        input_text = (
            f"Patient ID {patient_data['patient_id']}. "
            f"Conditions: {patient_data['conditions']}. "
            f"Medications: {patient_data['medications']}. "
            f"Encounters: {patient_data['encounters']}. "
            f"Procedures: {patient_data['procedures']}."
        )
        logging.debug(f"Input text: {input_text}")

        # Tokenize input text
        inputs = tokenizer.encode(
            input_text,
            return_tensors="pt",
            max_length=512,
            truncation=True
        )
        logging.debug(f"Tokenized inputs: {inputs}")

        # Generate summary
        summary_ids = model.generate(
            inputs,
            max_length=500,
            num_beams=4,
            early_stopping=True,
            no_repeat_ngram_size=2
        )
        logging.debug(f"Generated summary_ids: {summary_ids}")

        # Decode and return the summary
        summary = tokenizer.decode(summary_ids[0], skip_special_tokens=True)
        return summary
    except Exception as e:
        logging.error(f"Error in generate_summary_bart: {e}")
        raise

# Main function to process CSV and return summary
def process_csv(filepath):
    try:
        logging.info(f"Processing CSV file: {filepath}")
        # Load the CSV file
        patient_df = pd.read_csv(filepath)
        logging.debug(f"Loaded DataFrame: {patient_df.head()}")

        # Check if the file is empty
        if patient_df.empty:
            logging.error("The CSV file is empty.")
            return {"error": "The CSV file is empty."}

        # Extract the first patient's data (or loop over all patients if needed)
        data = patient_df.iloc[0]
        logging.debug(f"First patient data: {data}")

        # Preprocess the data
        preprocessed_data = preprocess_data(data)

        # Generate summary using BART
        summary = generate_summary_bart(preprocessed_data)
        logging.debug(f"Summary generated: {summary}")

        # Prepare the output as a JSON object
        output = {
            "patient_id": preprocessed_data['patient_id'],
            "summary": summary
        }

        logging.info(f"Generated output: {output}")
        return output

    except Exception as e:
        logging.error(f"Error in process_csv: {e}")
        return {"error": str(e)}