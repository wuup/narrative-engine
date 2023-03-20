# Python Flask API
from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from pymongo import MongoClient

app = Flask(__name__)
api = Api(app)

client = MongoClient("mongodb://localhost:27017")
db = client["user_actions_db"]
collection = db["user_actions"]

class UserActions(Resource):
    def post(self):
        user_actions = request.get_json()
        collection.insert_one(user_actions)
        return jsonify({"message": "User actions recorded successfully"})

api.add_resource(UserActions, "/api/track_event")

if __name__ == "__main__":
    app.run(debug=True)
