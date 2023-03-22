# app.py - Flask app with integrated backend API for the Narrative Engine PoC

from flask import Flask, render_template, request, jsonify
import requests
from flask_pymongo import PyMongo
from bson.json_util import dumps
import json
from pymongo import MongoClient
from datetime import datetime
from bson.json_util import loads
import pymongo

app = Flask(__name__, static_folder='static')

# MongoDB client setup
client = MongoClient()
db = client['interactions']
collection = db['user_interactions']

# Configuration for MongoDB database
app.config["MONGO_URI"] = "mongodb://localhost:27017/narrative_engine"
mongo = PyMongo(app)

# Configuration for OpenAI API
API_KEY = ""

conversation_history = [
    {
        "role": "system",
        "content": "You are a helpful bot"
    }
]
def fetch_user_actions():
    interactions = mongo.db.interactions.find()
    formatted_interactions = []

    for interaction in interactions:
        formatted_interaction = loads(dumps(interaction))
        formatted_interaction['_id'] = str(formatted_interaction['_id'])
        formatted_interactions.append(formatted_interaction)

    return json.dumps(formatted_interactions)


def count_characters(text):
    return len(text)

def truncate_conversation_history():
    global conversation_history
    total_characters = sum([count_characters(msg["content"]) for msg in conversation_history])
    while total_characters > 8000:
        removed_message = conversation_history.pop(0)
        total_characters -= count_characters(removed_message["content"])


def get_user_interactions():
    # Establish a connection to MongoDB
    client = pymongo.MongoClient("mongodb://localhost:27017/")

    # Access the "interactions" database and the "user_interactions" collection
    db = client["interactions"]
    col = db["user_interactions"]

    # Find all documents in the collection
    cursor = col.find()

    # Create an empty list to store the documents
    documents = []

    # Append each document to the list
    for document in cursor:
        documents.append(document)

    # Return the list of documents
    return documents

def get_gpt4_response(prompt):
    global conversation_history
    print(conversation_history)
    
    if prompt.lower() == "get actions":
        fetched_actions = get_user_interactions()
        actions_string = ""
        for action in fetched_actions:
            timestamp = action.get('timestamp', 'unknown timestamp')
            action_type = action.get('type', action.get('action', 'unknown type'))
            element = action.get('element', 'unknown element')
            
            actions_string += f"{timestamp}: {action_type} - {element}"
            if 'details' in action:
                actions_string += f" ({action['details']})"
            if 'key' in action:
                actions_string += f" ({action['key']})"
            actions_string += "\n"
        conversation_history.append({"role": "assistant", "content": actions_string})
        return actions_string

    
    headers = {"Authorization": f"Bearer {API_KEY}"}
    conversation_history.append({"role": "user", "content": prompt})
    truncate_conversation_history()
    data = {
        "model": "gpt-4",
        "messages": conversation_history,
        "max_tokens": 2000,
    }
    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=data)
    
    print("Status Code:", response.status_code)  # Debugging line
    print("Response Content:", response.content)  # Debugging line

    if response.status_code == 200:
        bot_response = response.json()['choices'][0]['message']['content'].strip()
        conversation_history.append({"role": "assistant", "content": bot_response})
        return bot_response
    else:
        return f"Error: {response.status_code}"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/message', methods=['POST'])
def message():
    user_input = request.form['input']
    response = get_gpt4_response(user_input)
    
    if response.startswith("Error"):
        return jsonify({'response_type': 'error', 'response': response})
    elif user_input.lower() == "get actions":
        return jsonify({'response_type': 'actions', 'response': response})
    else:
        return jsonify({'response_type': 'success', 'response': response})


# Store user interactions
@app.route('/store_interaction', methods=['POST'])
def store_interaction():
    interaction = request.json

    # Add timestamp to interaction
    interaction['timestamp'] = datetime.utcnow().isoformat()

    # Insert interaction into MongoDB collection
    result = collection.insert_one(interaction)
    interaction_id = result.inserted_id

    # Return JSON response with interaction ID
    return jsonify({'interaction_id': str(interaction_id)})

@app.route("/get_interactions", methods=["GET"])
def get_interactions():
    interactions = mongo.db.interactions.find()
    return dumps(interactions)

if __name__ == '__main__':
    app.run(debug=True)