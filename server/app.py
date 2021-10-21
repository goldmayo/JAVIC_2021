from flask import Flask, render_template, request

from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

import common_api_frame as api_frame

app = Flask(__name__)

bot = ChatBot(
    'JAVIC',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    logic_adapters=[
        {
            'import_path':'my_logic_adapter.MyLogicAdapter'
        },
        {
            'import_path':'chatterbot.logic.BestMatch',
            'default_response': api_frame.wrap_content('질문의 의도를 모르겠어요.'),
            'maximum_similarity_threshold': 0.90
        },

    ],
    database_uri='sqlite:///database.db'
)
trainer = ChatterBotCorpusTrainer(bot)
# trainer.train("./data/korean/chatterbot_corpus")
trainer.train("./data/korean/test/my_train.yml")

@app.route('/',methods=['GET', 'POST'])
def chatbot():
        return render_template('chatbot.html')

@app.route("/bot",methods=['POST'])
def get_bot_response():
    req = request.get_json()
    print("\n> Client reqest:",req)
    botResponse = bot.get_response(req["text"]).text
    appResponse = app.make_response(botResponse)
    appResponse.mimetype="application/json"
    print("\n>Server response :",appResponse)

    return appResponse

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=7000)