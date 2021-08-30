# -*- coding: utf-8 -*-
from flask import Flask, render_template, send_from_directory, session, request, redirect, url_for
import flask

from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

import json
import os

#local module
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
            'default_response': '질문의 의도를 모르겠어요.',
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

@app.route("/req",methods=['POST'])
def procReq():
    req = flask.request.get_json()
    print("\n> Client reqest:",req)
    txt = req["text"]
    rst = txt
    response = bot.get_response(txt)
    rst = response.text
    dict = rst
    try:
        tmp = json.loads(dict)
        temp_resp =dict 
        del tmp
    except:
        temp_resp = api_frame.wrapContent(dict)
    
    resp = app.make_response(temp_resp)
    resp.mimetype="application/json"
    print("\n>Server response :",resp)

    return resp

if __name__ == '__main__':
    app.run(host='0.0.0.0',debug=True, port=7000)