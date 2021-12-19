from flask import request 
from flask_restful import Resource


class Login (Resource):
    def __init__(self):
        print(f'\nthis is Login id : {id(self)}')

    def post(self):
        print("login : ",request.get_json())
        return request.get_json()

    def __del__(self):
        print("Login Class is deleted!")