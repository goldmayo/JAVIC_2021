from flask import request , make_response
from flask_restful import Resource

from chatbot import JAVIC

# app = Blueprint('bot_response',__name__)

class Chatbot (Resource):
    bot = JAVIC
    def __init__(self):
        print(f'\nthis is Chatbot id : {id(self)}')

    def post(self):
        user_input = request.get_json()
        javic_response = JAVIC.get_response(user_input["text"])
        response = make_response(javic_response.text)
        response.mimetype="application/json"
        return response

    def __del__(self):
        print("Chatbot Class is deleted!")