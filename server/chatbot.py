from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

# import common_api_frame as api_frame

print("javic loading...")
JAVIC = ChatBot(
    'JAVIC',
    storage_adapter='chatterbot.storage.SQLStorageAdapter',
    logic_adapters=[
        {
            'import_path':'my_logic_adapter.MyLogicAdapter'
        },
        # {
        #     'import_path':'chatterbot.logic.BestMatch',
        #     'default_response': api_frame.wrap_content('질문의 의도를 모르겠어요.'),
        #     'maximum_similarity_threshold': 0.90
        # },

    ],
    database_uri='sqlite:///database.db'
)
trainer = ChatterBotCorpusTrainer(JAVIC)
# trainer.train("./data/korean/chatterbot_corpus/conversations.yml")
trainer.train("./data/korean/test/my_train.yml")