from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)  

# In-memory storage for scraped texts
scraped_texts = []

@app.route('/webscrape', methods=['GET'])
def webscrape():
    url = request.args.get('url') 
    
    try:
        response = requests.get(url)
        response.raise_for_status() 
        soup = BeautifulSoup(response.text, "html.parser")
        text = soup.get_text(separator=" ", strip=True)
        
        # Send the scraped text to the save endpoint
        save_text({"text": text})
        
        return jsonify({"message": "Text scraped and saved successfully"}), 200
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Error fetching URL: {str(e)}"}), 500

@app.route('/save-text', methods=['POST'])
def save_text(data):
    # Save the scraped text in the in-memory list
    scraped_texts.append(data)
    return jsonify({"message": "Text saved successfully"}), 200

@app.route('/get-scraped-text', methods=['GET'])
def get_scraped_text():
    # Return the list of scraped texts
    return jsonify(scraped_texts), 200

if __name__ == '__main__':
    app.run(debug=True)
