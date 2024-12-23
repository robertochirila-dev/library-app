# app.py

from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson import ObjectId

# Initialize the Flask app
app = Flask(__name__)

from flask_cors import CORS  # Import CORS

app = Flask(__name__)

# Enable CORS for all routes
CORS(app)



# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017')  # Adjust the URI if necessary
db = client['library']  # Replace with your actual database name
books_collection = db['books']  # Replace with your actual collection name

@app.route('/add-book', methods=['POST'])
def add_book():
    data = request.get_json()

    if not data or not data.get('title') or not data.get('author'):
        return jsonify({"error": "Title and Author are required"}), 400

    new_book = {
        "title": data.get('title'),
        "author": data.get('author'),
        "genre": data.get('genre', 'Unknown'),
        "available": data.get('available', True),
    }

    try:
        # Insert the new book into the MongoDB collection
        result = books_collection.insert_one(new_book)
        new_book['_id'] = str(result.inserted_id)  # Convert the ObjectId to string for better readability
        return jsonify({"message": "Book added successfully!", "book": new_book}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)