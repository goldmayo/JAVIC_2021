from chatterbot.logic import LogicAdapter

import yaml
import pickle
import os
import random
import json 

import common_api_frame as api_frame
from ServiceBox import *
from VacationService import *
from NaiveBayesModel import *

import requests
# from flask import jsonify
# from flask import Response, session

class MyLogicAdapter(LogicAdapter):

    def __init__(self, chatbot, **kwargs):
        super().__init__(chatbot, **kwargs)
        print(f'\nthis is MLA id : {id(self)}')
        self.__classifier = NaiveBayesClassifier() # 나이브 베이즈 모델
        self._service_box = ServiceBox() # 서비스
        self.__intentList = self.__classifier.get_labels()
        self.intent = "none"

    def __del__(self):
        print("MLAClass is deleted!")

    def initialize_service(self,service):# 실행중인 서비스가 없는 경우
        print("\n!--initialize service")
        intent = self.switch_intent(service)
        print(intent)
        if(intent == 'draft_vacation'):
            return self.initialize_vacation(service)
        elif (intent == 'cancel'):
            return api_frame.wrap_content("현재 진행중인 서비스가 존재하지 않습니다.")
        elif (intent == 'yes'):
            return api_frame.wrap_content("현재 진행중인 서비스가 존재하지 않습니다.")
        else: 
            print("other service")
            return api_frame.wrap_content("문의하신 내용에 대해 다음에는 안내드릴 수 있도록 열심히 학습하겠습니다.")

    def initialize_vacation(self,intent):
        vacation = VacationService()
        self._service_box.add_service(vacation)
        vacation.set_service_name(intent) # 서비스 이름 설정
        if (vacation.has_next()): # 시작일 종료일 중 어떤 것 이라도 none(입력을 받지 않으면) True 둘다 입력받으면 false
            return api_frame.wrap_content(vacation.get_next())# 시작일 종료일 입력받기
        else:
            ###
            # return Draft_Vacation(vacation.getData())
            ###
            self._service_box.remove_service() #현재 서비스에서 제거
            return api_frame.wrap_content("휴가를 신청하였습니다.")

    def switch_intent(self,prediction):
        INTENTLIST = {
            '휴가신청' : 'draft_vacation',
            '메일확인' : 'mail_check',
            '취소' : 'cancel',
            '긍정' : 'yes',
            '부정' : 'no',
            'no_service' : 'no_service'
        }
        print("user intent :",INTENTLIST[prediction])
        return INTENTLIST[prediction]  

    def decide_intent(self,statement):
        intent = self.__classifier.get_predict(statement)
        return intent
    
    def handle_service_flag(self,resp):
        if(len(resp) == 2):
            selected_statement = resp[0]
            self._service_box.remove_service()
        else:
            selected_statement = resp
        return selected_statement

    def handle_ongoing_service(self,prediction,input_statement):
        if self._service_box.has_service(): # 서비스가 실행중인 경우
            print("\n!--ongoing service case")
            intent = self.switch_intent(prediction)
            request_packet = self._service_box.get_service() # 현재 서비스를 알아냄
            now_service_kor = request_packet.get_service_name() # 현재 서비스의 이름 /휴가신청, 메일확인
            print("---intent : ",prediction)
            print("---request_packet 현재 서비스: ",request_packet)
            print("---now_service_kor 현재 서비스 이름: ",now_service_kor)
            now_service_eng = self.switch_intent(now_service_kor)
            if intent == "no_service":# 숫자등 사용자 입력
                sequence_resp = request_packet.do_sequence(input_statement) # 현재 서비스의 .do_sequence()실행
                return self.handle_service_flag(sequence_resp)
            else:# intent가 숫자가 아닌 경우
                if intent == now_service_eng:# 현재 서비스 재요청하는 경우
                    print("현재 서비스 재요청")
                    sequence_resp = request_packet.do_sequence(input_statement)
                    return self.handle_service_flag(sequence_resp)
                else: #현재 서비스와 다른 경우
                    if intent == 'yes': #확인
                        print("---intent : yes")
                        request_packet.set_agreement(True)
                        sequence_resp = request_packet.do_sequence(input_statement)
                        return self.handle_service_flag(sequence_resp)         
                    elif(intent =='cancel'): # 취소
                        print("---intent : ",prediction)
                        self._service_box.remove_service()# 현재 서비즈 중단
                        return api_frame.wrap_content(now_service_kor+" 서비스를 취소했습니다.") # 취소 메시지 전송
                        # input_statement.text = api_frame.wrap_content("서비스를 취소합니다") # 취소 메시지 전송
                    else:
                        print("----다른 서비스 요청")
                        self._service_box.remove_service() #현재 서비스를 취소
                        # 요청한 서비스 실행
                        return self.process(input_statement,{})

    def can_process(self,statement):
        """
        실행중인 서비스가 있는 경우,
        Intent가 서비스목록(labels)에 있을 경우
        True를 반환하여 my_service_logic_adapter의 process 함수가 실행된다.
        """
        # 서비스 중
        self.intent = self.decide_intent(statement.text)
        if(self._service_box.has_service()):
            print("service is on")
            return True
        else:
            # 사용자 입력의 의도가 서비스 목록에 있을 경우 실행
            print("intent : ",self.intent)
            print("labels : ",self.__intentList) 
            if self.intent in self.__intentList:
                print("IntentPredict :",self.intent)
                print("CanProcess() : true")
                return True
            else:
                return False
    
    # def debug_statement(self,statement):
    #     print("\n--------debug_statement--------")
    #     print("> id :",statement.id,
    #     "\n> text :",statement.text,
    #     "\n> search_text :",statement.search_text,
    #     "\n> conversation :",statement.conversation,
    #     "\n> persona :",statement.persona,
    #     "\n> tags :",statement.tags,
    #     "\n> in_response_to :",statement.in_response_to,
    #     "\n> search_in_response_to :",statement.search_in_response_to)
    #     print("------------------------------\n")

    def process(self, input_statement):
        selected_statement = input_statement
        selected_statement.confidence = 1 #confidence
        intent = self.intent
        if self._service_box.has_service(): # 서비스가 실행중인 경우
            selected_statement.text = self.handle_ongoing_service(intent,input_statement)
        else: # 실행중인 서비스가 없는 경우
            selected_statement.text = self.initialize_service(intent)
        # self.debug_statement(selected_statement)
        return selected_statement

# def extractNumber(string):
#     regex = re.compile(r'([0-9]*)')
#     tokens = word_tokenize(string)
#     pos = pos_tag(tokens)
#     namedEnt = ne_chunk(pos, binary=True)
#     first = True
#     for i in namedEnt:
#         if(first==True and i[1]=='CD'):
#             num = regex.search(i[0])
#             return num.group()
#             first = False
#     return None

# def Draft_Vacation(s_date,e_date):
#         params = {
#             'draft_sdate' : s_date,
#             'draft_edate' : e_date,
#             'key' : session['userKey']
#         }        
#         url = API_HOST_HANDY_PORT + '/draftvacation'
#         response = requests.get(url, params=params)
#         if response.status_code == 200: # 성공
#             resp = api_frame.wrap_content(" "+s_date+"부터 "+e_date+"까지 휴가를 신청했습니다.")
#             return resp
#         elif response.status_code == 404:
#             resp = api_frame.wrap_content("휴가신청을 실패했습니다. 다시 시도해주세요.") #휴가신청실패
#             return resp
#         else:
#             resp = api_frame.wrap_content("휴가신청 중에 에러가 발생했습니다. 다시 시도해주세요.") #휴가신청실패
#             return resp
