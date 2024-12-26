from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from bson import ObjectId
import logging
from typing import Dict, Any
from http import HTTPStatus

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize the Flask app
app = Flask(__name__)
CORS(app)

# Configuration
class Config:
    MONGO_URI = 'mongodb://localhost:27017'
    DATABASE_NAME = 'library'
    COLLECTION_NAME = 'books'

# MongoDB connection handling
def get_db():
    try:
        client = MongoClient(Config.MONGO_URI)
        return client[Config.DATABASE_NAME]
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        raise

# ... existing code ...

@app.route('/add-book', methods=['POST'])
def add_book() -> tuple[Dict[str, Any], int]:
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'author']
        if not data or not all(field in data for field in required_fields):
            return {
                "error": "Title and Author are required",
                "missing_fields": [field for field in required_fields if field not in data]
            }, HTTPStatus.BAD_REQUEST

        new_book = {
            "title": data['title'],
            "author": data['author'],
            "genre": data.get('genre', 'Unknown'),
            "available": data.get('available', True),
        }

        db = get_db()
        result = db[Config.COLLECTION_NAME].insert_one(new_book)
        new_book['_id'] = str(result.inserted_id)
        
        logger.info(f"Successfully added book: {new_book['title']}")
        return {"message": "Book added successfully!", "book": new_book}, HTTPStatus.CREATED

    except Exception as e:
        logger.error(f"Error adding book: {str(e)}")
        return {"error": "Internal server error"}, HTTPStatus.INTERNAL_SERVER_ERROR

# ... existing code ...

if __name__ == '__main__':
    app.run(debug=True)