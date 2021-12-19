from flask import Flask , render_template
from flask_restful import Api

from api.handle_bot_response import Chatbot
from api.handle_login import Login

app = Flask(__name__)
api = Api(app)

api.add_resource(Chatbot, '/bot')
api.add_resource(Login, '/login')
# app.register_blueprint(Chatbot.app)

# @app.route('/',methods=['GET', 'POST'])
# def chatbot():
#         return render_template('chatbot.html')

@app.route("/",methods=['POST','GET'])
def handle_login():
    return render_template('login.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=7000)