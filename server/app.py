from flask import Flask, render_template, request
from chatbot import JAVIC
import common_api_frame as api_frame
app = Flask(__name__)


@app.route('/',methods=['GET', 'POST'])
def chatbot():
        return render_template('chatbot.html')

@app.route("/bot",methods=['POST'])
def get_bot_response():
    req = request.get_json()
    print("\n> Client reqest:",req)
    botResponse = JAVIC.get_response(req["text"])
    print("botResponse:",botResponse)
    appResponse = app.make_response(botResponse.text)
    appResponse.mimetype="application/json"
    print("\n>Server response :",appResponse)
    return appResponse

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=7000)