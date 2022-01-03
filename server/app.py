from flask import Flask , render_template
# from flask_restful import Api
from flask_sock import Sock

# from api.handle_bot_response import Chatbot
from api.handle_login import Login

from chatbot import JAVIC

app = Flask(__name__)
# api = Api(app)
sock = Sock(app)

# api.add_resource(Chatbot, '/bot')
# api.add_resource(Login, '/login')
# app.register_blueprint(Chatbot.app)

@sock.route('/bot')
def create_response(ws):
    while True:
        user_input = ws.receive()
        print("user:",user_input)
        javic_response = JAVIC.get_response(user_input["text"])
        # javic_response = JAVIC.get_response(user_input)
        print("javic:",javic_response.text)
        ws.send(javic_response.text)


# @app.route('/',methods=['GET', 'POST'])
# def chatbot():
#         return render_template('chatbot.html')

@app.route("/",methods=['POST','GET'])
def handle_login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=7000)