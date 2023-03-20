# Python Flask API - Add a new endpoint to get user actions
class GetUserActions(Resource):
    def get(self):
        user_actions = list(collection.find())
        for action in user_actions:
            action["_id"] = str(action["_id"])
        return jsonify(user_actions)

api.add_resource(GetUserActions, "/api/get_user_actions")
